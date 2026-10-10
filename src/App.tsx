import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HomePage } from '@/pages/HomePage';
import { BlogListPage, BlogPostPage } from '@/pages/BlogPages';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { FaqPage } from '@/pages/FaqPage';
import { PrivacyPage } from '@/pages/PrivacyPage';
import { TermsPage } from '@/pages/TermsPage';
import { DisclaimerPage } from '@/pages/DisclaimerPage';
import {
  AiScreenshotAnalyzerPage,
  ScreenshotToTaskPage,
  ScreenshotToTodoPage,
  ScreenshotToActionPage,
  ScreenshotTaskExtractorPage,
  AiToolsForContractorsPage,
  ContractorProductivityToolsPage,
} from '@/pages/landingPages';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/blog" element={<BlogListPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/disclaimer" element={<DisclaimerPage />} />
              <Route path="/ai-screenshot-analyzer" element={<AiScreenshotAnalyzerPage />} />
              <Route path="/screenshot-to-task" element={<ScreenshotToTaskPage />} />
              <Route path="/screenshot-to-todo" element={<ScreenshotToTodoPage />} />
              <Route path="/screenshot-to-action" element={<ScreenshotToActionPage />} />
              <Route path="/screenshot-task-extractor" element={<ScreenshotTaskExtractorPage />} />
              <Route path="/ai-tools-for-contractors" element={<AiToolsForContractorsPage />} />
              <Route path="/contractor-productivity-tools" element={<ContractorProductivityToolsPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
