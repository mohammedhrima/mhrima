import React from 'react';
import ReviewOnScroll from '../ReviewOnScroll';

// Reusable ProjectCard component
const ProjectCard = ({ title, description, technologies, link }) => {
  return (
    <div className="p-6 rounded-xl border border-white/10 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 mb-4 hidden md:block">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <span key={index}
            className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 cursor-pointer hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all "
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <a href={link} className="text-blue-400 hover:text-blue-300 transition-colors my-4">
          View Project →
        </a>
      </div>
    </div>
  );
};

// Main Projects component
function Projects() {
  const projectsData = [
    {
      title: "Frontend Framework (UraJS)",
      description: "Developed custom JavaScript/TypeScript framework inspired by ReactJS and NextJS. Implemented real-time rendering. Created Dockerfile and Nginx config generation for easy deployment.",
      technologies: ["Javascript", "TypeScript", "ExpressJS", "Docker", "Nginx"],
      link: "https://github.com/mohammedhrima/UraJS",
    },
    {
      title: "AI-Powered Image Classifier",
      description: "Developed using Python, deep learning, and CNNs with TensorFlow. Achieved accurate image recognition across categories with AI models. Integrated OpenCV for real-time AI-driven image prediction.",
      technologies: ["Python", "TensorFlow", "OpenCV"],
      link: "https://example.com/ai-image-classifier",
    },
    {
      title: "Online Chat Platform",
      description: "Built a full-stack web app with real-time messaging using React, Node.js, and Express. Used PostgreSQL for efficient data storage. Designed a responsive UI for a smooth user experience.",
      technologies: ["React", "Node.js", "Express.js", "PostgreSQL"],
      link: "https://example.com/chat-platform",
    },
    {
      title: "Patients Management",
      description: "RESTful API built with Node.js and Express for managing patient records. Uses MySQL for storing patient data, supporting CRUD operations. Enables efficient patient management in a healthcare system.",
      technologies: ["Node.js", "Express.js", "MySQL"],
      link: "https://example.com/patients-management",
    },
    {
      title: "Dashboard",
      description: "Built a real-time data dashboard with React and Express.js. Used SQLite with Prisma for smooth database interactions. Designed an interactive, responsive UI for clear data insights.",
      technologies: ["React", "Express.js", "SQLite", "Prisma"],
      link: "https://example.com/dashboard",
    },
    {
      title: "Raytracer",
      description: "Built a C++ raytracer to render 3D scenes with realistic lighting, reflections, and shadows. Optimized performance using multithreading for faster rendering. Developed camera controls (zoom, rotate, pan) for interactive scene navigation using mouse and keyboard.",
      technologies: ["C++"],
      link: "https://example.com/raytracer",
    },
    {
      title: "Order Execution and Management System",
      description: "Implemented core features: place, cancel, modify orders, and view orderbook using C++. Integrated WebSocket server for real-time market data updates.",
      technologies: ["C++", "WebSocket"],
      link: "https://example.com/order-system",
    },
    {
      title: "HTTP WebServer",
      description: "Built a high-performance C++ HTTP webserver based on RFC standards. Designed to serve static content efficiently, with architecture similar to Nginx. Created a tester to simulate client requests, ensuring the server's reliability in various use cases.",
      technologies: ["C++", "Nginx"],
      link: "https://example.com/http-webserver",
    },
    {
      title: "Compiler (wolf-c)",
      description: "Designed a Python-like language with types using C. Implemented optimization algorithms using the Intermediate Representation. Generated assembly code directly, eliminating reliance on third-party frameworks.",
      technologies: ["C"],
      link: "https://github.com/mohammedhrima/Wolf-Compiler",
    },
    {
      title: "Interpreter",
      description: "Developed an interpreter that executes instructions line by line in C. Implemented a recursive descent parser to process and run code efficiently.",
      technologies: ["C"],
      link: "https://example.com/interpreter",
    },
  ];

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center relative">
      <ReviewOnScroll>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projectsData.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                link={project.link}
              />
            ))}
          </div>
        </div>
      </ReviewOnScroll>
    </section>
  );
}

export default Projects;