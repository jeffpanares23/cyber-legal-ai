"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
interface ReferenceBoxProps {
  expanded: boolean;
  onToggle: () => void;
  content?: string | null;
  onClose: () => void; // ✅ NEW: To support manual and auto-close
}

const ReferenceBox: React.FC<ReferenceBoxProps> = ({
  expanded,
  onToggle,
  content,
  onClose,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect mobile screen
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // ✅ Listen to URL changes to auto-close on chat switch
  useEffect(() => {
    const handleRouteChange = () => {
      onClose(); // Auto-close Reference Box
    };

    window.addEventListener("hashchange", handleRouteChange);
    window.addEventListener("popstate", handleRouteChange); // For browser navigation

    return () => {
      window.removeEventListener("hashchange", handleRouteChange);
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [onClose]);

  const containerVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "tween", duration: 0.4 },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: { type: "tween", duration: 0.3 },
    },
  };

  const widthVariants = {
    collapsed: {
      width: isMobile ? "100%" : "20rem",
      transition: { duration: 0.3 },
    },
    expanded: {
      width: isMobile ? "100%" : "35rem",
      transition: { duration: 0.3 },
    },
  };

  if (!content) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="ref-box"
        className="fixed lg:static top-0 right-0 h-full z-40 border-l border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl overflow-y-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="h-full p-4 flex flex-col justify-between"
          variants={widthVariants}
          animate={expanded ? "expanded" : "collapsed"}
        >
          <div>
            {/* 🔘 Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold">Reference Summary</h2>

              <div className="flex gap-2 items-center">
                <button
                  onClick={onToggle}
                  className="text-xs text-indigo-500 hover:underline"
                >
                  {expanded ? (isMobile ? "Close" : "Minimize") : "Expand"}
                </button>
                {/* ❌ Close button */}
                <button
                  onClick={onClose}
                  className="text-zinc-500 hover:text-red-500"
                  title="Close reference"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 📄 Reference Content */}
            <div
              className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReferenceBox;
