import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { GraphQLServer } from 'graphql-yoga';

var app = express.Router();

import api from './api/mongodb';

app.use(bodyParser.json());

/// set headers for response object
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();


});


// add auth middleware

/// Declare error response 
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

const server = new GraphQLServer({
    typeDefs: "./graphql/schema.graphql",
    resolvers: {

    },
    context: {
    },
});

mongoose
    .connect(api)
    .then(() => {
        server.start(() => {
            console.log('The server is up!');
        });
    })
    .catch(err => console.log(err));

