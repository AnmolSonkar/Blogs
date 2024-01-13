import { useState, useEffect } from "react";
import useFetch from "./useFetch";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
    const { id } = useParams();
    const { data: blog } = useFetch("http://localhost:3000/" + id);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);
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
            const response = await fetch(`http://localhost:3000/` + blog._id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedBlog),
            });

            if (!response.ok) {
                throw new Error(`Failed to edit blog. Status: ${response.status}`);
            }

            const data = await response.json();
            // console.log("Blog Updated Successfully", data);
            setLoading(false);
            navigate("/");
        } catch (error) {
            console.error("Error in updating blog:", error.message);
        }
    };

    return (
        <div className="flex-grow p-4 flex justify-center mt-[4vh] lg:mt-[7vh]">
            {blog && (
                <form className="flex flex-col lg:w-3/12 w-full" onSubmit={handleSubmit}>
                    <label>Blog Title</label>
                    <input
                        className="p-2 mt-2 outline-none rounded-sm focus:outline-green-600 outline-1 transition-all ease-in-out"
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
                        className="p-2 mt-2 resize outline-none rounded-sm focus:outline-green-600 outline-1 transition-all ease-in-out"
                        required
                    ></textarea>
                    <button className="bg-green-600 w-fit mt-3 p-1 px-2 rounded-md text-white hover:bg-green-700 active:bg-green-600 text-[15px]">
                        {!loading && <p>Update</p>}
                        {loading && <p>Updating...</p>}
                    </button>
                </form>
            )}
        </div>
    );
};

export default Edit;
