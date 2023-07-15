const mysql = require("mysql2");
require("dotenv").config();
const pool = mysql.createPool({
  url:"mysql://root:8ZWhccd3myW6u4fZDrP9@containers-us-west-68.railway.app:7637/railway",
  poolOptions: {
    max: 10,
    min: 0,
    acquireTimeout: 10000,
  }
});
pool.getConnection((err, conn) => {
  if (err) console.log(err);
  console.log("Connected successfully");
});

module.exports = pool.promise();

// host: process.env.DB_HOST,
// user: process.env.DB_USERNAME,
// password: process.env.DB_PASSWORD,
// database: process.env.DB_NAME,