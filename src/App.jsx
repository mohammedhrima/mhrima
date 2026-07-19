import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

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

// Shell
import SiteHeader from '../components/site/SiteHeader';
import SiteFooter from '../components/site/SiteFooter';

/**
 * React Router owns navigation, so the browser never performs its own hash
 * jump. This restores it: scroll to `#id` on hash changes, and back to the top
 * on a plain route change.
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target exists once the route has rendered.
      const id = decodeURIComponent(hash.slice(1));
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--font-space-grotesk',
      "'Space Grotesk', sans-serif"
    );
    document.documentElement.style.setProperty(
      '--font-jetbrains-mono',
      "'JetBrains Mono', monospace"
    );
  }, []);

  return (
    <BrowserRouter>
      <ScrollManager />
      <div className="ds-root flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/tutorials" element={<TutorialsPage />} />
            <Route path="/tutorials/urajs" element={<UraJSPage />} />
            <Route path="/tutorials/ura-lang" element={<UraLangPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
    </BrowserRouter>
  );
}
