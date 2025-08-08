const express = require('express')
const userRoutes = require('./routes/userRoute')
const app = express()
const port = 3000

app.use(express.json());

app.use('/api/users', userRoutes);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })