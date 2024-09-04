const mongoose = require("mongoose");

module.exports = {
  connect: () => {
    mongoose
      .connect("mongodb://0.0.0.0/khaatabook")
      .then(() => {
        console.log("connected to MongoDB");
      })
      .catch((err) => {
        console.log("Error connecting to MongoDB");
      });
  },
};
