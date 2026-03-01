// src/sections/Skills.jsx

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

import {
  FaJava,
  FaReact,
  FaHtml5,        // Added
  FaCss3Alt,      // Added
  FaBootstrap,    // Added
  FaSitemap,      // Added (Using for Microservices)
  FaVial,         // Added (Using for Mockito)
  FaAws,          // Added
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFastapi,
  SiPython,
  SiDocker,
  SiMongodb,
  SiJavascript,   // Added
  SiGraphql,      // Added
  SiRedux,        // Added
  SiMysql,        // Added
  SiCplusplus,    // Added
  SiSpringboot,   // Added
  SiJunit5,       // Added
  SiApachekafka,  // Added
  SiRabbitmq,     // Added
  SiKubernetes,   // Added
} from "react-icons/si";
import { DiNodejsSmall } from "react-icons/di";

export default function Skills() {
  // 🟢 Skills list
  const skills = [
    // Your original skills
    { icon: <FaJava />, name: "Java" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
    { icon: <SiFastapi />, name: "FastAPI" },
    { icon: <SiPython />, name: "Python" },
    { icon: <SiDocker />, name: "Docker" },
    { icon: <SiMongodb />, name:"MongoDB" },

    // --- Added skills ---
    { icon: <FaHtml5 />, name: "HTML" },
    { icon: <FaCss3Alt />, name: "CSS" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <SiGraphql />, name: "GraphQL" },
    { icon: <FaBootstrap />, name: "Bootstrap" },
    { icon: <SiRedux />, name: "Redux" },
    { icon: <SiRedux />, name: "Redux Toolkit" }, // For "redux tool"
    { icon: <SiMysql />, name: "MySQL" },
    { icon: <SiCplusplus />, name: "C++" },
    { icon: <SiSpringboot />, name: "Spring Boot" },
    { icon: <FaSitemap />, name: "Microservices" },
    { icon: <SiJunit5 />, name: "JUnit" },
    { icon: <FaVial />, name: "Mockito" },
    { icon: <SiApachekafka />, name: "Kafka" },
    { icon: <SiRabbitmq />, name: "RabbitMQ" },
    { icon: <SiKubernetes />, name: "Kubernetes" }, // For "kubernates"
    { icon: <FaAws />, name: "AWS" },
  ];

  // 🔁 Duplicate list (2x is enough for seamless loop)
  const repeatedSkills = [...skills, ...skills];

  // 🟢 Scroll direction detection
  const [dir, setDir] = useState(-1); // -1 = left, 1 = right
  const containerRef = useRef(null);
  const touchYRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      const nextDir = e.deltaY > 0 ? -1 : 1;
      if (nextDir !== dir) setDir(nextDir);
    };

    const onTouchStart = (e) => {
      touchYRef.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (touchYRef.current == null) return;
      const dy = e.touches[0].clientY - touchYRef.current;
      const nextDir = dy < 0 ? -1 : 1;
      if (nextDir !== dir) setDir(nextDir);
      touchYRef.current = e.touches[0].clientY;
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [dir]);

  // 🟢 requestAnimationFrame marquee loop
  const x = useMotionValue(0);
  const trackRef = useRef(null);

  useEffect(() => {
    let rafId;
    let last = performance.now();
    const BASE_SPEED = 80; // px per second

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;

      let next = x.get() + BASE_SPEED * dir * dt;

      // wrap based on half the scroll width (since we duplicated 2x)
      const loopWidth = trackRef.current?.scrollWidth
        ? trackRef.current.scrollWidth / 2
        : 0;

      if (loopWidth > 0) {
        while (next <= -loopWidth) next += loopWidth;
        while (next >= 0) next -= loopWidth;
      }

      x.set(next);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [dir, x]);

  return (
    <section
      id="skills"
      className="h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden"
      ref={containerRef}
    >
      {/* 🟢 Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2] opacity-20 blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] opacity-20 blur-[120px] animate-pulse delay-500"></div>
      </div>

      {/* 🟢 Heading */}
      <motion.h2
        className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] z-10"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Skills
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        className="mt-2 mb-8 text-white/90 text-base sm:text-lg z-10"
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Modern Applications | Modern Technologies
      </motion.p>

      {/* 🟢 Scrolling skills */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-10 text-6xl text-[#1CD8D2]"
          style={{ x, whiteSpace: "nowrap", willChange: "transform" }}
        >
          {repeatedSkills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 min-w-[120px]"
              aria-label={skill.name}
              title={skill.name}
            >
              <span className="hover:scale-125 transition-transform duration-300">
                {skill.icon}
              </span>
              <p className="text-sm">{skill.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
