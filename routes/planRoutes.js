import express from "express";

import Plan from "../models/Plan.js";
import authMiddleWare from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/planner', authMiddleWare, async (req, res) => {
    try {
        console.log(req.body);
        const name = req.body.name;
        const places = req.body.planner;
        const newPlan = new Plan({name, places: places, user: req.user.id});
        await newPlan.save();
        console.log(newPlan);
        res.status(200).json({ message: 'Planner data saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving planner data', error });
    }
});
router.get('/planner', authMiddleWare, async (req, res) => {
    try {
        const plans = await Plan.find({ user: req.user.id });
        if(plans.length === 0) return res.status(404).json({ message: 'User has no plans'});
        res.status(200).json(plans);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching planner data', error });
    }
});
router.get('/planner/:planId', authMiddleWare, async (req, res) => {
    const { planId } = req.params;
    try {
        const plan = await Plan.findById(planId).populate('user');
        if (!plan) return res.status(404).json({ error: 'Plan not found' });
        if (plan.user._id.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized access' });
        res.status(200).json(plan);
    } catch (error) {
        console.error('Error fetching plan:', error);
        res.status(500).json({ error: 'Error fetching plan details' });
    }
});
export default router;
