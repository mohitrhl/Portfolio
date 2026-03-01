import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function OverlayMenu({ isOpen, onClose }) {
  // ✅ Detect if screen is "mobile" size
  // This changes the animation's origin point (where the circle grows from).
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024; // lg breakpoint
  const origin = isMobile ? "95% 8%" : "50% 8%"; 
  // Mobile → circle expands from top-right corner
  // Desktop → expands from top-center

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          // Initial state → hidden circle
          initial={{ clipPath: `circle(0% at ${origin})` }}
          // Animate → circle grows to cover entire screen
          animate={{ clipPath: `circle(150% at ${origin})` }}
          // Exit → shrink circle back
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
        >
          {/* ❌ Close Button (top-right) */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white text-3xl"
            aria-label="Close menu"
          >
            <FiX />
          </button>

          {/* 🔗 Menu Links */}
          <ul className="space-y-6 text-center">
            {[
              "Home",
              "About",
              "Skills",
              "Projects",
              // "Experience",
              // "Testimonials",
              "Contact",
            ].map((item, index) => (
              <motion.li
                key={item}
                // Animate links one by one (staggered fade-in)
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <a
                  href={`#${item.toLowerCase()}`} // scrolls to section
                  onClick={onClose} // auto-close after clicking
                  className="text-4xl text-white font-semibold hover:text-pink-400 transition-colors duration-300"
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
