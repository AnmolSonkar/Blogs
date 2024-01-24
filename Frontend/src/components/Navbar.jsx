import { Link } from "react-router-dom";
import Logo from "/Blog.png";

const Navbar = () => {
    return (
        <nav className="flex justify-between bg-[#1F1F1F] text-white p-4 text-sm shadow-md px-5">
            <Link className="flex items-center space-x-2" to="/">
                <img className="w-8 h-8" src={Logo} alt="logo" />
                <h1 className="cursor-pointer text-base"> {"Anmol's Blog"}</h1>
            </Link>
            <div className="flex lg:space-x-5 space-x-3 items-center">
                <Link to="/">Home</Link>
                <Link to="/create">New Blog</Link>
            </div>
        </nav>
    );
};

export default Navbar;
