const User = require("../models/users");

const adminTest = {
  email: "admin@automart.com",
  password: "adminadmin"
};

createAdmin();

function createAdmin() {
  User.makeAdmin(adminTest, (err, res) => {
    if (err) {
      console.log("Admin Not created");
    } else {
      console.log("===== Admin Created ======");
    }
  });
}
