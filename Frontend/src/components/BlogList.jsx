import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
    return (
        <div>
            {blogs.map((e) => (
                <div className="mt-2 mb-6" key={e._id}>
                    <Link className="hover:underline" to={`/blogs/${e.slug}`}>
                        <h1 className="text-xl">{e.title}</h1>
                    </Link>
                    <p>
                        {new Date(e.createdAt).toLocaleString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default BlogList;
