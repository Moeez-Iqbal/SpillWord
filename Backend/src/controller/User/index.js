import User from "../../model/User/index.js";// Assuming UserModel is defined in a separate file

// Controller function for creating a new user
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
