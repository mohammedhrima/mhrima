import React, { useEffect } from "react";

function Navbar({ menuOpen, setMenuOpen }) {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen])

  return (
    <nav className="fixed top-0 w-full z-40 bg-[rgb(10,10,10,0.8)] backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="#home" className="font-mono text-xl font-bold text-white">
            Hrima <span className="text-blue-500">Dev</span>
          </a>

          <div className={`w-7 h-5 relative cursor-pointer z-40 md:hidden transition-opacity duration-300 ${menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            onClick={() => setMenuOpen((prev) => !prev)} >
            &#9776;
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-300 hover:text-white transition-colors">Home</a>
            {/* <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a> */}
            <a href="#skills" className="text-gray-300 hover:text-white transition-colors">Skills</a>
            <a href="#education" className="text-gray-300 hover:text-white transition-colors">Education</a>
            <a href="#experience" className="text-gray-300 hover:text-white transition-colors">Experience</a>
            <a href="#projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
            {/* <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
