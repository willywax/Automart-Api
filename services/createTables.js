const pool = require("./connection");

const { userTable } = require("./tables");

// tables.forEach(element => {
//   prepareTables(element);
// });

prepareTables(userTable);

function prepareTables(query) {
  pool
    .query(query)
    .then(res => {
      console.log(query);
    })
    .catch(err => {
      console.log(err);
    });
}
