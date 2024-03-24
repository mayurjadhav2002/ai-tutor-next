const express = require('express')
var cors = require("cors")
const {Connect} = require("./connect");
const user_route = require('./Routes/userRoute');
const topicRoute = require('./Routes/topicRoute');
const explainRoute = require('./Routes/Explanation');
require('dotenv').config()
const port = process.env.PORT;
const app = express()

app.use(cors());

app.get('/', (req,res)=>{
    res.send("Hello, World!")
})

app.use('/user', user_route)
app.use('/topic', topicRoute)
app.use('/explanation', explainRoute)
Connect()
app.listen(port, ()=> console.log(`connected to port: ${port}`))

const hitAPI = async () => {
    try {
        const response = await axios.get('https://ai-tutor-next-backend.onrender.com/');
        console.log('API hit successful:', response.data);
    } catch (error) {
        console.error('Error while hitting API:', error);
    }
};

setInterval(hitAPI, 2 * 60 * 1000);