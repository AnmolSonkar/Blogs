import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
    const { id } = useParams();
    const { data: blog } = useFetch("http://localhost:3000/" + id);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (blog) {
            setTitle(blog.title);
            setBody(blog.body);
        }
    }, [blog]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedBlog = { title, body };
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:3000/${blog._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedBlog),
            });

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`Blog with ID ${blog._id} not found.`);
                } else {
                    throw new Error(`Failed to edit blog. Status: ${response.status}`);
                }
            }

            navigate("/");
        } catch (error) {
            setError(error.message);
            navigate("/edit/" + id);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-grow p-4 flex justify-center">
            {error && (
                <div
                    className="lg:p-4 mb-4 text-sm fixed p-3  lg:w-[24.5vw] text-red-800 rounded-lg bg-red-50 border border-red-200"
                    role="alert"
                >
                    <span className="font-medium">{error}</span>
                </div>
            )}

            <form className="flex flex-col mt-[4rem] lg:w-3/12 w-full" onSubmit={handleSubmit}>
                <label>Blog Title</label>
                <input
                    className="p-2 mt-2 outline-none rounded-sm  transition-all ease-in-out"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label className="mt-2"> Blog Content</label>
                <textarea
                    rows={7}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="p-2 resize mt-2 outline-none rounded-sm  transition-all ease-in-out"
                    required
                ></textarea>
                <button className="bg-green-600 w-fit mt-3 p-1 px-3 rounded-md text-white active:bg-green-700 text-[15px]">
                    {!loading && <p>Update</p>}
                    {loading && <p>Updating...</p>}
                </button>
            </form>
        </div>
    );
};

export default Edit;
