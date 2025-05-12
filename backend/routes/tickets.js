const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const { auth, adminAuth } = require('../middleware/auth');

// Create a new ticket for an event
router.post('/:eventId', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const ticket = new Ticket({
      ...req.body,
      event: req.params.eventId
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all tickets for an event
router.get('/event/:eventId', async (req, res) => {
  try {
    const tickets = await Ticket.find({ event: req.params.eventId })
      .sort({ price: 1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single ticket
router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate('event', 'title date venue');
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a ticket
router.put('/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a ticket
router.delete('/:id', auth, async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update ticket status (e.g., mark as sold out)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    ticket.status = status;
    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get ticket availability
router.get('/:id/availability', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.json({
      isAvailable: ticket.isAvailable(),
      remainingQuantity: ticket.getRemainingQuantity(),
      status: ticket.status
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update sold tickets count (for purchase)
router.patch('/:id/purchase', auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const ticket = await Ticket.findById(req.params.id)
      .populate('event');
    
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    // Check if user has already purchased a ticket for this event
    if (ticket.hasUserPurchased(req.user._id)) {
      return res.status(400).json({ 
        message: 'You have already purchased a ticket for this event' 
      });
    }

    if (!ticket.isAvailable() || ticket.getRemainingQuantity() < quantity) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    // Add purchase record
    ticket.purchases.push({
      user: req.user._id,
      quantity: quantity
    });

    ticket.sold += quantity;
    if (ticket.sold >= ticket.quantity) {
      ticket.status = 'sold_out';
    }
    
    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get user's purchased tickets
router.get('/user/purchases', auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({
      'purchases.user': req.user._id
    }).populate('event', 'title date venue image');
    
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 