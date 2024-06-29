import User from "../../model/User/index.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, credits } = req.body;
    const user = new User({ name, email, password, credits });

    // Initialize remaining emails based on credits
    user.remainingEmails = credits * 100; // Assuming 1 credit = 100 emails

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
