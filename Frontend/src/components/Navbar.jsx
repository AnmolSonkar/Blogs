import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex justify-between bg-[#1F1F1F] text-white p-4 text-sm shadow-md px-5">
            <Link to="/">
                <h1 className="cursor-pointer text-base"> {"Anmol's Blog"}</h1>
            </Link>
            <div className="lg:space-x-5 space-x-3">
                <Link to="/">Home</Link>
                <Link to="/create">New Blog</Link>
            </div>
        </nav>
    );
};

export default Navbar;
