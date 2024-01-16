import Blog from '../models/blogModels.js'

const blog_index = async (req, res) => {
    try {
        const result = await Blog.find().sort({ createdAt: -1 });
        res.send(result)
    } catch (error) {
        res.send(error)
    }
};

const blog_details = async (req, res) => {
    const slug = req.params.slug;
    try {
        const result = await Blog.findOne({ slug: slug })
        res.send(result)
    } catch (error) {
        res.send(error)
    }
};

const blog_create_post = async (req, res) => {

    const { title, body } = req.body;

    const blog = new Blog({ title, body });

    try {
        const result = await blog.save();
        res.send(result);
    } catch (error) {
        res.send(error)
    }
};

const blog_update = async (req, res) => {

    const slug = req.params.slug;


    try {
        const result = await Blog.findOne({ slug: slug });
        res.render('/edit', { title: "Edit", blogs: result });
    } catch (error) {
        res.send(error)
    }
};

const blog_update_post = async (req, res) => {

    const id = req.params.id;

    const { title, body } = req.body;

    const updatedData = {
        title: title,
        body: body
    };

    try {
        const result = await Blog.findByIdAndUpdate(id, updatedData, { new: true });
        await result.save();
        res.send(result);

    } catch (error) {
        res.send(error)
    }
};


const blog_delete = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await Blog.findByIdAndDelete(id);
        res.send(result);
    } catch (error) {
        res.send(error)
    }
};
export default {
    blog_index,
    blog_details,
    blog_create_post,
    blog_update,
    blog_update_post,
    blog_delete,
};
