import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Page components
import HomePage from './pages/home/page';
import ProjectsPage from './pages/projects/page';
import ExperiencePage from './pages/experience/page';
import SkillsPage from './pages/skills/page';
import EducationPage from './pages/education/page';
import ResumePage from './pages/resume/page';
import ContactPage from './pages/contact/page';
import TutorialsPage from './pages/tutorials/page';
import UraJSPage from './pages/tutorials/urajs/page';
import UraLangPage from './pages/tutorials/ura-lang/page';

// Components
import Navbar from '../components/Navbar';
import MobileMenu from '../components/MobileMenu';
import LoadingScreen from '../components/LoadingScreen';
import ThemeSelector from '../components/ui/ThemeSelector';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Always show loading screen on fresh page load or reload
    setShowLoading(true);
    
    // Apply font classes to html element
    document.documentElement.style.setProperty('--font-space-grotesk', "'Space Grotesk', sans-serif");
    document.documentElement.style.setProperty('--font-jetbrains-mono', "'JetBrains Mono', monospace");
  }, []);

  const handleLoadingComplete = () => {
    setIsLoaded(true);
    setShowLoading(false);
  };

  return (
    <BrowserRouter>
      {showLoading && !isLoaded && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <ThemeSelector />
        <main className="min-h-screen">
          <Routes>
            {/* Main routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Tutorials routes */}
            <Route path="/tutorials" element={<TutorialsPage />} />
            <Route path="/tutorials/urajs" element={<UraJSPage />} />
            <Route path="/tutorials/ura-lang" element={<UraLangPage />} />
            
            {/* Redirect all unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
