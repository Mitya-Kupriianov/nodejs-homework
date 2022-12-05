const { User } = require("../../models/user");
const { HTTPError } = require("../../helpers");

const updateSubscription = async (req, res, next) => {
  const { _id, token } = req.user;
  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate(
    { _id },
    { subscription },
    { new: true },
  );
  if (!result) {
    throw HTTPError(404);
  }

  res.json({
    token,
    user: {
      subscription,
    },
  });
};

module.exports = updateSubscription;
