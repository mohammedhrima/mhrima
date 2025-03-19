import React from 'react';
import ReviewOnScroll from '../ReviewOnScroll';

// Reusable EducationEntry component
const EducationEntry = ({ degree, institution, date, location, description, link }) => {
  return (
    <li>
      <strong>{degree}</strong>
      {institution && (
        <>
          {" "}-{" "}
          <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            {institution}
          </a>
        </>
      )}
      <p className="text-sm text-gray-400">{date} | {location}</p>
      <p className="text-base text-gray-400 ml-4 hidden md:block">{description}</p>
    </li>
  );
};

// Main Education component
function Education() {
  const educationData = [
    {
      degree: "Computer Science",
      institution: "Mohammed VI Polytechnic University, 1337",
      date: "Jan 2025",
      location: "Ben Guerir",
      description:
        "Learned algorithms, data structures, and software development principles. Gained hands-on experience through project-based learning inspired by the 42 Network pedagogy.",
      link: "https://1337.ma/en/",
    },
    {
      degree: "Self Learning",
      institution: null, // No institution for self-learning
      date: "2020",
      location: "During COVID-19",
      description:
        "Started programming during the pandemic. Learned the basics of programming, Python, JavaScript, HTML, and CSS. Built small projects to solidify my understanding.",
      link: null,
    },
    {
      degree: "Bachelor's in Mechanical Engineering",
      institution: "Faculty of Science and Technology",
      date: "Jul 2019",
      location: "Settat",
      description:
        "Studied mechanical engineering principles, including thermodynamics, fluid mechanics, and material science. Gained a strong foundation in engineering design.",
      link: "https://www.fsts.ac.ma/",
    },
    {
      degree: "CNC Machining",
      institution: "Institute of Aeronautical Trades",
      date: "Nov 2019",
      location: "Nouaceur",
      description:
        "Learned to operate and program CNC machines. Gained practical skills in machining, precision manufacturing, and CAD/CAM software.",
      link: "https://www.imacasablanca.com/",
    },
    {
      degree: "Mechanical Manufacturing",
      institution: "Specialized Technician Diploma",
      date: "Jun 2018",
      location: "Safi",
      description:
        "Completed a 6-month training program focused on mechanical manufacturing. Learned to use CAD software like Catia and SolidWorks for design and prototyping.",
      link: "https://www.ofppt.ma/en",
    },
    {
      degree: "Scientific Mathematics Baccalaureate",
      institution: "Cherif Idrissi",
      date: "Jun 2016",
      location: "Safi",
      description:
        "Graduated with a focus on mathematics and physics. Developed strong analytical and problem-solving skills.",
      link: null,
    },
  ];

  return (
    <section id='education' className="min-h-screen flex items-center justify-center py-20">
      <ReviewOnScroll>
        <div className='max-w-5xl mx-auto px-4'>
          <h2 className='text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center '>Education</h2>
          <div className='grid grid-cols-1 md:grid-cols-1 gap-6 mt-8'>
            <div className='p-6 rounded-xl border-white/10'>
              <ul className="list-none list-inside text-gray-300 space-y-2">
                {educationData.map((edu, index) => (
                  <EducationEntry
                    key={index}
                    degree={edu.degree}
                    institution={edu.institution}
                    date={edu.date}
                    location={edu.location}
                    description={edu.description}
                    link={edu.link}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ReviewOnScroll>
    </section>
  );
}

export default Education;