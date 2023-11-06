const db = require("../../server/config/connection");
const { User } = require("../../server/models");
const userSeeds = require("./userSeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});

    await User.create(userSeeds);

    console.log("Users have been added!");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});