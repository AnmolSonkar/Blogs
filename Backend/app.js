import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import mongoose from 'mongoose';
import blogController from './controllers/blogController.js';

const app = express();

app.use(cors());
app.use(express.json());

const dbURI = process.env.MONGODB_URI;

const startServer = () => {
    app.listen(3000, 'localhost', () => {
        console.log("Server is running on port 3000.");
    });
};

const Connect = async () => {
    try {
        await mongoose.connect(dbURI);
        startServer();
    } catch (error) {
        console.log(error);
    }
};

Connect();

app.get('/', blogController.blog_index);
app.get('/:slug', blogController.blog_details)
app.post('/', blogController.blog_create_post)
app.post('/:slug', blogController.blog_update);
app.put('/:id', blogController.blog_update_post);
app.delete('/:id', blogController.blog_delete);

