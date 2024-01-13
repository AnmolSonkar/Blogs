import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import Edit from "./EditBlog";
import { Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, loading, error } = useFetch("http://localhost:3000/" + id);

    const html = blog && DOMPurify.sanitize(blog.marked_sanitized_html);

    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const response = await fetch("http://localhost:3000/" + blog._id, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`Failed to delete blog. Status: ${response.status}`);
            }

            const data = await response.json();
            // console.log("Blog deleted successfully", data);
            navigate("/");
        } catch (error) {
            console.error("Error deleting blog:", error.message);
        }
    };

    return (
        <div className="flex-grow p-4 flex justify-center">
            {error && <div>{error}</div>}
            {loading && <div className="lg:w-[65vw] w-[90vw]">Loading...</div>}
            {blog && (
                <article className="lg:w-[65vw] w-[90vw]">
                    <h2 className="lg:text-2xl text-xl mt-2 font-semibold">{blog.title}</h2>
                    <p className="lg:mb-8 mb-7 mt-1">
                        {new Date(blog.createdAt).toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}
                        <Link
                            className="ml-2 hover:underline"
                            to={`/Edit/${blog.slug}`}
                            element={<Edit />}
                        >
                            Edit
                        </Link>
                        <button className="ml-2 hover:underline" onClick={handleClick}>
                            Delete
                        </button>
                    </p>
                    <div className="html" dangerouslySetInnerHTML={{ __html: html }} />
                </article>
            )}
        </div>
    );
};

export default BlogDetails;
