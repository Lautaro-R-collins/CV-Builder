import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto flex justify-center items-center gap-2 py-5">
      <p className="text-gray-500 text-xl">
        Developed by Lautaro Rodriguez Collins
      </p>

      <a
        href="https://github.com/lrcollins"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-gray-700 transition-colors"
      >
        <Github size={20} />
      </a>
    </footer>
  );
};

export default Footer;
