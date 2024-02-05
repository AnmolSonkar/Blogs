import mongoose from 'mongoose';
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import slugify from 'slugify';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';


const marked = new Marked(markedHighlight({
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
}));

const DOMPurify = createDOMPurify(new JSDOM('').window);

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    marked_sanitized_html: {
        type: String,
        required: true
    },
},
    { timestamps: true });

blogSchema.pre('validate', function (next) {

    if (this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    if (this.body) {
        this.marked_sanitized_html = DOMPurify.sanitize(marked.parse(this.body));

    }
    next()
})

const Blog = mongoose.model('Blog', blogSchema);

export default Blog