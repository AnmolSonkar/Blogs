const Footer = () => {
    return (
        <footer className="flex flex-col bg-[#1F1F1F] text-white text-center p-2 text-sm shadow-md">
            <span>Copyright &copy; 2024</span>
            <span>
                Designed & Developed By{" "}
                <a
                    className="underline"
                    target="_blank"
                    href="https://anmolsonkar.netlify.app/"
                    rel="noreferrer"
                >
                    Anmol Sonkar
                </a>
            </span>
        </footer>
    );
};

export default Footer;
