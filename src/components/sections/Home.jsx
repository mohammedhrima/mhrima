import { FaLinkedin, FaGithub, FaEnvelope, FaDiscord, FaTwitch } from "react-icons/fa";
import ReviewOnScroll from "../ReviewOnScroll";

function Home() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <ReviewOnScroll>
        <div className="text-center z-10 px-2">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-right text-white">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Hrima Mohammed
            </span>
          </h1>

          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Welcome to my digital space! I'm a{" "}
            <span className="font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Software Developer
            </span>{" "}
            driven by curiosity and a deep passion for crafting seamless digital experiences.
            From intuitive user interfaces to the intricate mechanics of low-level systems,
            I love exploring the full spectrum of software development because knowing how things work isn't just a habit, it's an obsession.
          </p>

          <div className="flex justify-center space-x-4">
            <a href="#projects" className="bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:shadow-[0_0_20px_10px_rgba(59,130,246,0.15)]">
              View Projects
            </a>
            <a href="#contacts" className="border border-blue-500/50 text-blue-500 py-3 px-6 rounded font-medium transition-all duration-200 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.2)] hover:bg-blue-500/10">
              Contacts
            </a>
          </div>

          {/* Social Media Buttons */}
          <div className="flex justify-center space-x-4 mt-15">
            <a href="https://www.linkedin.com/in/mohammedhrima/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition text-4xl">
              <FaLinkedin />
            </a>
            <a href="https://github.com/mohammedhrima" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition text-4xl"  >
              <FaGithub />
            </a>
            <a href="mailto:mohammed.hrima1998@gmail.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition text-4xl">
              <FaEnvelope />
            </a>
            {/* <a href="https://discord.com/invite/your-invite" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-500 transition text-4xl" >
              <FaDiscord />
            </a> */}
            {/* <a href="https://twitch.tv/your-profile" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-700 transition text-4xl" >
              <FaTwitch />
            </a> */}
          </div>
        </div>
      </ReviewOnScroll>
    </section>
  );
}

export default Home;
