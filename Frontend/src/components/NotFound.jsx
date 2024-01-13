import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex-grow p-4 flex justify-center mt-10">
            <div>
                <p>Sorry</p>
                <p>That page cannot be found</p>
                <Link className="mt-4 underline" to="/">
                    Back to the homepage...
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
