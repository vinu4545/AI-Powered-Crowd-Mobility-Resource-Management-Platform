import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        main h1,
        main h2,
        main h3,
        main h4,
        main h5,
        main h6 {
          color: #000 !important;
          font-weight: 400 !important;
        }
      `}</style>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <motion.main
          className="flex-1"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {children}
        </motion.main>
        <Footer />
      </div>
    </>
  );
}