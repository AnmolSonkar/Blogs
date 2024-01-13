import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [Loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const blog = { title, body };
        setLoading(true);

        try {
            const send = await fetch("http://localhost:3000/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(blog),
            });

            if (!send.ok) {
                throw new Error(`Failed to add blog. Status: ${send.status}`);
            }
            const data = await send.json();
            // console.log("Blog Added Successfully", data);
            setLoading(false);
            navigate("/");
        } catch (error) {
            console.error("Error adding blog:", error.message);
        }
    };

    return (
        <div className="flex-grow p-4 flex justify-center mt-[4vh] lg:mt-[7vh]">
            <form className="flex flex-col lg:w-3/12 w-full" onSubmit={handleSubmit}>
                <label>Blog Title</label>
                <input
                    className="p-2 mt-2 outline-none rounded-sm focus:outline-green-600 outline-1 transition-all ease-in-out"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label className="mt-2"> Blog Content</label>
                <textarea
                    rows={7}
                    onChange={(e) => setBody(e.target.value)}
                    className="p-2 resize mt-2 outline-none rounded-sm focus:outline-green-600 outline-1 transition-all ease-in-out"
                    required
                ></textarea>
                <button className="bg-green-600 w-fit mt-3 p-1 px-3 rounded-md text-white hover:bg-green-700 active:bg-green-600 text-[15px]">
                    {!Loading && <p>Add</p>}
                    {Loading && <p>Adding...</p>}
                </button>
            </form>
        </div>
    );
};

export default Create;
