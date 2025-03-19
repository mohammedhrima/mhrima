import React from 'react'
import ReviewOnScroll from '../ReviewOnScroll'

function Skills() {
  return (
    <section id='skills' className="min-h-screen flex items-center justify-center py-20">
      <ReviewOnScroll>
        <div className='max-w-5xl mx-auto px-4'>
          <h2 className='text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center '>Skills</h2>

          <div className='rounded-xl p-8 border-white/10 border '>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <div className="rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Programming Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {["C", "C++", "JavaScript/TypeScript", "Python", "Bash", "Assembly"].map((tech, key) => (
                    <span key={key} className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] cursor-pointer transition">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Backend Development</h3>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "Express.js", "Flask"].map((tech, key) => (
                    <span key={key} className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] cursor-pointer transition">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Frontend Development</h3>
                <div className="flex flex-wrap gap-2">
                  {["React.js", "Next.js", "Vue.js"].map((tech, key) => (
                    <span key={key} className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] cursor-pointer transition">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Tools and Databases</h3>
                <div className="flex flex-wrap gap-2">
                  {["Docker", "Docker Compose", "Git", "PostgreSQL", "MySQL", "MariaDB", "MongoDB"].map((tech, key) => (
                    <span key={key} className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] cursor-pointer transition">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Computer-Aided Design</h3>
                <div className="flex flex-wrap gap-2">
                  {["SolidWorks", "Catia", "AutoCAD", "TopSolid"].map((tech, key) => (
                    <span key={key} className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] cursor-pointer transition">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Project Planning</h3>
                <div className="flex flex-wrap gap-2">
                  {["MS Project"].map((tech, key) => (
                    <span key={key} className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] cursor-pointer transition">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Personal Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {["Reading Novels", "Fitness", "Continuous Learning"].map((interest, key) => (
                    <span key={key} className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] cursor-pointer transition">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ReviewOnScroll>
    </section>
  )
}

export default Skills