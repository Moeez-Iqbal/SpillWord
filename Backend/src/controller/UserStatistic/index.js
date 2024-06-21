import User from '../../model/User/index.js';

export const getUserStatistics = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (user) {
      res.json({
        totalEmails: user.totalEmails,
        delivered: user.delivered,
        opened: user.opened,
        clicked: user.clicked
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user statistics', error });
  }
};
