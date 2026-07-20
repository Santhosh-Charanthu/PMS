"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ProtectedRoute from "./ProtectedRoute";

export default function DashboardShell({ children, title }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-[var(--background)]">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <div className="flex min-h-screen flex-1 flex-col">
          <Navbar onMenuClick={() => setMobileOpen(true)} title={title} />
          <motion.main
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 px-4 py-6 lg:px-8 lg:py-8"
          >
            {children}
          </motion.main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
