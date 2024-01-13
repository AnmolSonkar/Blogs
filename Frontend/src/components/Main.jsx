import BlogList from "./BlogList";
import useFetch from "./useFetch";

const Main = () => {
    const { data: blogs, loading, error } = useFetch("http://localhost:3000/");

    return (
        <main className="flex-grow p-4">
            {error && <div>{error}</div>}
            {loading && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} />}
        </main>
    );
};

export default Main;
