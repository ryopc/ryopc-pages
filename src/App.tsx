import { Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { Footer, Header } from './components/SiteLayout';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ServicesPage from './pages/ServicesPage';
import WorkDetailPage from './pages/WorkDetailPage';
import WorksPage from './pages/WorksPage';

export default function App() {
  return <>
    <ScrollToTop />
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/works" element={<WorksPage />} />
      <Route path="/works/:id" element={<WorkDetailPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <Footer />
  </>;
}
