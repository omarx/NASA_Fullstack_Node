const http=require('http');
const app=require('./app');
const {mongoConnect}=require('./services/mongo')
require ('dotenv').config();
port=process.env.PORT || 8000;

const {loadPlanetsData} = require("./src/models/planets.model");

const server = http.createServer(app);

async function startServer(){

    await mongoConnect();
    await loadPlanetsData();
    server.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    });
}

startServer();