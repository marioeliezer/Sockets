import Server from "./clases/server";
import router from "./routes/router";

import express from 'express';
import cors from 'cors';



const server = new Server();

//body parser
server.app.use(express.urlencoded({extended:true}));
server.app.use(express.json());

server.app.use(cors({origin:true, credentials:true }));

server.app.use('/',router);

server.start(()=>{
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});