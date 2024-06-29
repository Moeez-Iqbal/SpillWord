import User from '../../model/User/index.js';
import Subscription from '../../model/Subscription/index.js';

// Function to create a new user with subscription
export const createUser = async (req, res) => {
  try {
    const { name, email, password, subscriptionType, startDate, endDate } = req.body;

    // Determine initial credits based on subscription type
    let initialCredits = 0;
    if (subscriptionType === 'Basic') {
      initialCredits = 1;
    } else if (subscriptionType === 'Premium') {
      initialCredits = 3;
    } else {
      return res.status(400).json({ msg: 'Invalid subscription type' });
    }

    // Calculate initial remaining emails based on initial credits
    const initialRemainingEmails = initialCredits * 100;

    // Create the user
    const user = new User({ name, email, password, credits: initialCredits, remainingEmails: initialRemainingEmails });

    // Save the user
    await user.save();

    // Create the subscription
    const subscription = new Subscription({
      userId: user._id,
      type: subscriptionType,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
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
    user.credits += convertedCredits;
    user.remainingEmails += convertedCredits;

    await user.save();

    res.json({ user });
  } catch (error) {
    console.error('Error updating credits and emails:', error);
    res.status(400).json({ error: error.message });
  }
};
