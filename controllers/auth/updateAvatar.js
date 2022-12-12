const { User } = require("../../models/user");
const path = require("path");
const Jimp = require("jimp");
const { HTTPError } = require("../../helpers");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  try {
    Jimp.read(tempUpload, (err, image) => {
      if (err) HTTPError(400);
      image.resize(250, 250).quality(60).write(resultUpload);
    });
    // await fs.rename(tempUpload, resultUpload);
  } catch (error) {
    return next(HTTPError(400, "Something went wrong!"));
  }
  const avatarUrl = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarUrl });
  res.json({
    avatarUrl,
  });
};

module.exports = updateAvatar;
