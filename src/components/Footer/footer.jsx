import { Github } from 'lucide-react';
   
   
const Footer = () => {
    return (
        <footer className="mt-auto">
            <p className="text-center text-gray-500 text-md mt-5">Developed by Lautaro Rodriguez Collins</p>
            <a href="https://github.com/lrcollins" target="_blank" rel="noopener noreferrer">
                <Github size={20} />
            </a>
        </footer>
    );
};

export default Footer;