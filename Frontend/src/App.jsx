import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Create from "./components/CreateBlog";
import Edit from "./components/EditBlog";
import BlogDetails from "./components/BlogDetails";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./css/App.css";

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/blogs/:id" element={<BlogDetails />} />
                    <Route path="/Edit/:id" element={<Edit />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
