const app = require("./app");

const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// const connectToDB = async () => {
//   try {
//     await mongoose.connect(DB_HOST);
//     app.listen(PORT || 3000, () => {
//       console.log("Database MongoDB/contacts connection successful");
//     });
//   } catch (error) {
//     console.log(error.message);
//     process.exit(1);
//   }
// };

// connectToDB();
