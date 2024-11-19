// server.js
const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// username:johndoe
// email:johndoe@example.com
// password:securepassword
// contactInfo:1234567890
// organization:ExampleCorp