import mongoose from "mongoose";

import { MONGO_DB_URL } from '../contants/secrets.js';

export function connectMongoDb() {
    mongoose.connect(MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 180000,
    });
    mongoose.connection.on("connected", function() {
        console.info('The application connect to MongoDb successfuly.');
    });
    mongoose.connection.on("error", function() {
        console.error('The application cannot to connect to MongoDb.');
    });
}