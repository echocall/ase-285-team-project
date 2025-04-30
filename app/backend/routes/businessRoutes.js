const express = require('express');
const router = express.Router();
const Business = require('../schemas/Business');
const mongoose = require('mongoose');

// @route   GET /api/businesses/
// @desc    Get a list of all businesses
// @access  Public (no auth yet)
router.get('/', async (req, res) => {
	try {
		const businesses = await Business.find(
			{},
			{ name: 1, _id: 1 }
		);

		if (businesses.length <= 0) {
			// No businesses exist in the DB
			return res.status(404).json({
				error: 'No businesses found',
				message: 'No businesses found.',
			});
		}

		return res.status(200).json(businesses);
	} catch (err) {
		res.status(500).json({
			error: 'Could not fetch businesses',
			message: 'Could not fetch businesses.',
		});
	}
});

// @route   GET /api/businesses/:id
// @desc    Get a business by ID
// @access  Public (no auth yet)
router.get('/:id', async (req, res) => {
	try {
		const business = await Business.findById(
			req.params.id
		).populate('menus');
		if (!business)
			return res
				.status(404)
				.json({ error: 'Business not found' });
		res.json(business);
	} catch (err) {
		res
			.status(500)
			.json({ error: 'Could not fetch business' });
	}
});

// @route   POST /api/businesses
// @desc    Create a new business
// @access  Public (no auth yet)
router.post('/', async (req, res) => {
  try {
    const { name, url, address, allergens = [], diets = [] } = req.body;

    const existing = await Business.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ error: 'Business name already exists.' });
    }

		const newBusiness = new Business({
			name: name.trim(),
			url: url?.trim().toLowerCase(),
			address: address?.trim(),
			allergens,
			diets,
			menus: [],
		});

		const savedBusiness = await newBusiness.save();
		res.status(201).json(savedBusiness);
	} catch (err) {
		res.status(400).json({
			error: 'Error creating business: ' + err.message,
		});
	}
});


// @route   PUT /api/businesses/:id
// @desc    Update a business
// @access  Public (no auth yet)
router.put('/:id', async (req, res) => {
  try {
    const { name, url, address, allergens, diets, menus } = req.body;

    // Check if another business already exists with the same name
    const existingBusiness = await Business.findOne({
      name: name?.trim(),
      _id: { $ne: req.params.id }, // Exclude the current business from the check
    });

    if (existingBusiness) {
      return res.status(400).json({ error: 'Business name already exists.' });
    }

    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      {
        name: name?.trim(),
        url: url?.trim().toLowerCase(),
        address: address?.trim(),
        allergens,
        diets,
        menus,
      },
      { new: true }
    );

		if (!updatedBusiness)
			return res
				.status(404)
				.json({ error: 'Business not found' });
		res.json(updatedBusiness);
	} catch (err) {
		res.status(400).json({
			error: 'Error updating business: ' + err.message,
		});
	}
});


// @route   DELETE /api/businesses/:id
// @desc    Delete a business
// @access  Public (no auth yet)
router.delete('/:id', async (req, res) => {
	try {
		const deletedBusiness =
			await Business.findByIdAndDelete(req.params.id);
		if (!deletedBusiness)
			return res
				.status(404)
				.json({ error: 'Business not found' });
		res.json({ message: 'Business deleted successfully' });
	} catch (err) {
		res
			.status(500)
			.json({ error: 'Could not delete business' });
	}
});

module.exports = router;
