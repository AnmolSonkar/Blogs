import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [Loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const blog = { title, body };
        setLoading(true);

        try {
            const send = await fetch("http://localhost:5000/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(blog),
            });

            if (!send.ok) {
                throw new Error(`Failed to add blog. Status: ${send.status}`);
            }

            const data = await send.json();
            if (data.code === 11000) {
                setError("Title already exists. Please enter a different one.");
                navigate("/create");
            } else {
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
            navigate("/create");
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

            <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                <label>Blog Title</label>
                <input
                    className="p-2 mt-2 outline-none rounded-sm  transition-all ease-in-out"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label className="mt-2"> Blog Content</label>
                <textarea
                    rows={16}
                    onChange={(e) => setBody(e.target.value)}
                    className="p-2 resize mt-2 outline-none rounded-sm  transition-all ease-in-out"
                    required
                ></textarea>
                <button className="bg-green-600 w-fit mt-3 p-1 px-3 rounded-md text-white active:bg-green-700 text-[15px]">
                    {!Loading && <p>Add</p>}
                    {Loading && <p>Adding...</p>}
                </button>
            </form>
        </div>
    );
};

export default Create;
