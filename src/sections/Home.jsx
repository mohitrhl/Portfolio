// src/sections/Home.jsx

import React from "react";
import {motion}  from "framer-motion"; // ✅ FIXED: motion imported properly
import avatar from "../assets/avator.png"; // Avatar image shown on the right side

// Importing social media icons
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

import ParticleBackground from "../components/ParticlesBackground"; 
// Custom animated particle background

/* ============================
   SOCIAL LINKS CONFIGURATION
   ============================ */
const socials = [
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/mohitrhl" },
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/mohit-kumar001/" },
  { Icon: SiLeetcode, label: "LeetCode", href: "https://leetcode.com/u/mohit_rhl/" },
  
  
];

/* ============================
   GLOW ANIMATION CONFIGURATION
   ============================ */
const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

export default function Home() {
  /* ============================
     TYPEWRITER LOGIC
     ============================ */
  // const roles = ["Software Developer", "Web Developer", "Content Creator"];
  const roles = React.useMemo(() => ["Software Developer", "Web Developer"], []);
  const TYPE_SPEED = 60;
  const ERASE_SPEED = 40;
  const HOLD_TIME = 1200;

  const [index, setIndex] = React.useState(0);
  const [subIndex, setSubIndex] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const current = roles[index];
    const delay = deleting ? ERASE_SPEED : TYPE_SPEED;
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) {
        setSubIndex((v) => v + 1);
      } else if (!deleting && subIndex === current.length) {
        setTimeout(() => setDeleting(true), HOLD_TIME);
      } else if (deleting && subIndex > 0) {
        setSubIndex((v) => v - 1);
      } else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % roles.length);
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <section id="home" className="h-screen w-full relative overflow-hidden bg-black">
      {/* Background particle effect */}
      <ParticleBackground />

      {/* Faint glowing gradient blobs */}
      <div className="absolute inset-0">
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full 
                      bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2] 
                      opacity-10 blur-[150px] animate-pulse"
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full 
                      bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] 
                      opacity-30 blur-[150px] animate-pulse delay-500"
        />
      </div>

      {/* MAIN GRID */}
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center h-full text-center lg:text-left relative">
          <div className="w-full lg:pr-24 mx-auto max-w-[48rem]">

            {/* Typewriter roles */}
            <motion.div
              className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em] mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>
              <span
                className="inline-block w-[2px] ml-1 bg-white animate-pulse align-middle"
                style={{ height: "1em" }}
              />
            </motion.div>

            {/* MAIN HEADING */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold 
                         text-transparent bg-clip-text 
                         bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] drop-shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Hello, I&apos;m
              <br />
              <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap lg:leading-[1.1]">
                Mohit Kumar
              </span>
            </motion.h1>

            {/* SHORT INTRO TEXT */}
            <motion.p
              className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              I turn complex ideas into seamless, high-impact web experiences — 
              building modern, scalable, and lightning-fast applications that make a difference.
            </motion.p>

            {/* CALL-TO-ACTION BUTTONS */}
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <a
                href="#projects"
                className="px-6 py-3 rounded-full text-lg font-medium text-white 
                           bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] 
                           shadow-lg shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
              >
                View My Work
              </a>
              <a
                href="/Resume.pdf"
                download
                className="px-6 py-3 rounded-full text-lg font-medium text-black bg-white 
                           hover:bg-gray-200 shadow-lg hover:scale-105 transition-all duration-300"
              >
                My Resume
              </a>
            </motion.div>

            {/* SOCIAL MEDIA ICONS */}
            <div className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
              {socials.map(({ Icon, label, href }) => ( // ✅ FIXED: Destructured Icon
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={glowVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-gray-300"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative hidden lg:block">
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              right: "10px",
              width: "410px",
              height: "760px",
              borderRadius: "50%",
              filter: "blur(38px)",
              opacity: 0.32,
              background:
                "conic-gradient(from 0deg, #1CD8D2, #00bf8f, #302b63, #1CD8D2)",
              zIndex: 0,
            }}
          />
          <motion.img
            src={avatar}
            alt="Gaurav Gupta avatar"
            className="absolute top-1/2 -translate-y-1/2 object-contain select-none pointer-events-none"
            style={{
              right: "-30px",
              width: "780px",
              height: "780px",
              zIndex: 10,
            }}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
        </div>
      </div>

      {/* Mobile fixes */}
      <style>{`
        @media (max-width: 1023.98px) {
          #home .lg\\:grid-cols-2 {
            grid-template-columns: 1fr !important;
          }
          #home .lg\\:text-left {
            text-align: center !important;
          }
          #home .lg\\:justify-start {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
