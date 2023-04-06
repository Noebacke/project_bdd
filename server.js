require('dotenv').config();
const app = require('./app');


app.listen({ port: 5000 || 3000},async () => {

  console.log(`Server up on ${process.env.URL}`);
  
})