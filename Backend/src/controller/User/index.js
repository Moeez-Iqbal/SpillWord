import User from '../../model/User/index.js';
import Subscription from '../../model/Subscription/index.js';

// Function to create a new user with subscription
export const createUser = async (req, res) => {
  try {
    const { name, email, password, subscriptionType, subscriptionInterval, startDate } = req.body;

    // Determine initial credits based on subscription type
    let initialCredits = 0;
    if (subscriptionType === 'Starter') {
      initialCredits = 1;
    } else if (subscriptionType === 'Standard') {
      initialCredits = 3;
    } else if (subscriptionType === 'Plus') {
      initialCredits = 5;
    } else {
      return res.status(400).json({ msg: 'Invalid subscription type' });
    }

    // Validate subscription interval
    if (!['monthly', 'yearly'].includes(subscriptionInterval)) {
      return res.status(400).json({ msg: 'Invalid subscription interval' });
    }

    // Calculate initial email count based on initial credits
    const initialEmails = initialCredits * 100;

    // Calculate end date based on subscription interval
    const start = new Date(startDate);
    let endDate;
    if (subscriptionInterval === 'monthly') {
      endDate = new Date(start.setMonth(start.getMonth() + 1));
    } else if (subscriptionInterval === 'yearly') {
      endDate = new Date(start.setFullYear(start.getFullYear() + 1));
    }

    // Create the user
    const user = new User({ name, email, password, credits: initialCredits, remainingEmails: initialEmails });

    // Save the user
    await user.save();

    // Create the subscription
    const subscription = new Subscription({
      userId: user._id,
      type: subscriptionType,
      interval: subscriptionInterval,
      startDate: new Date(startDate),
      endDate,
      credits: initialCredits,
    });

    // Save the subscription
    await subscription.save();

    // Link the subscription to the user
    user.subscriptionId = subscription._id;
    await user.save();

    res.status(201).json({ user, subscription });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to update credits and remaining emails based on additional credits
export const updateCreditsAndEmails = async (req, res) => {
  try {
    const { userId, additionalCredits } = req.body;

    // Find the user and their subscription
    const user = await User.findById(userId).exec();
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const subscription = await Subscription.findOne({ userId: user._id }).exec();
    if (!subscription) {
      return res.status(404).json({ msg: 'Subscription not found' });
    }

    // Update credits and remaining emails
    const convertedCredits = additionalCredits * 100; // Convert additional credits to emails
    user.credits += additionalCredits;
    user.remainingEmails += convertedCredits;

    await user.save();

    res.json({ user });
  } catch (error) {
    console.error('Error updating credits and emails:', error);
    res.status(400).json({ error: error.message });
  }
};
