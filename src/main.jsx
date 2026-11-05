import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { PrefsProvider } from "./prefs";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";
import "./index.css";

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos/:slug" element={<Project />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PrefsProvider>
        <MotionConfig reducedMotion="user">
          <Layout>
            <AppRoutes />
          </Layout>
        </MotionConfig>
      </PrefsProvider>
    </BrowserRouter>
  </StrictMode>,
);
