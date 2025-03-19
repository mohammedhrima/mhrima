import { useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import MobileMenu from "./components/MobileMenu";
import Home from "./components/sections/Home";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Skills from "./components/sections/Skills";
import Education from "./components/sections/Education";
import Experience from "./components/sections/Experience";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div className={`min-h-screen transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"} bg-black text-gray-100`}>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Home />
        <Skills/>
        <Education/>
        <Experience/>
        <Projects />
        {/* <Contact /> */}
      </div>
    </>
  );
}

export default App;
