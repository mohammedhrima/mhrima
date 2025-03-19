import React from 'react';
import ReviewOnScroll from '../ReviewOnScroll';

const ExperienceEntry = ({ title, company, date, link, description }) => {
  return (
    <div>
      <h4 className="font-semibold">
        {title} {company && (<>{"at "} <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{company}</a></>)}
      </h4>
      <p className="text-sm text-gray-400">{date}</p>
      <ul className="list-none list-inside text-sm text-gray-400 space-y-1 mt-2 ml-4 hidden md:block">
        {description.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

function Experience() {
  const experiences = [
    {
      title: "Software Engineer (Bootcamp)",
      company: "GoQuant",
      date: "Feb 2025 | 4 Weeks",
      link: "https://https://goquant.io/",
      description: [
        "Built low-latency trading algorithms in C++ using multithreading for optimal performance.",
        "Contributed to company projects by developing scalable, real-time trading solutions.",
        "Collaborated in a team environment to deliver high-performance systems.",
        "Gained hands-on experience with financial markets and algorithmic trading strategies.",
      ],
    },
    {
      title: "Software Developer (Freelance)",
      date: "Jan 2022 – Mar 2022",
      description: [
        "Developed a Python desktop application for cross-shift team communication.",
        "Designed and implemented a user-friendly interface using Tkinter.",
        "Deployed the application for use in a manufacturing environment.",
      ],
    },
    {
      title: "Method Preparation Technician",
      company: "LPF Casablanca 2 (Aerospace Industry)",
      date: "Jan 2021 – Jan 2022",
      link: "https://www.groupe-lpf.com/",
      description: [
        "Optimized project scheduling using MS Project.",
        "Conducted meetings with clients such as SAFRAN and Rolls-Royce to discuss project requirements.",
        "Created 3D designs for control and manufacturing tools using TopSolid.",
        "Collaborated with cross-functional teams to ensure project milestones were met.",
      ],
    },
    {
      title: "CAD Trainer (Part-Time)",
      company: "Management Digital School",
      date: "Jan 2021 – Jun 2021",
      link: "https://mdssup.ma/",
      description: [
        "Taught 3D modeling using SolidWorks and Catia to students.",
        "Developed course materials and hands-on exercises to enhance learning outcomes.",
        "Provided mentorship and guidance to students on real-world engineering projects.",
      ],
    },
    {
      title: "CNC Machinist",
      company: "LPF Casablanca 1, (Aerospace Industry)",
      date: "Nov 2019 – Mar 2020",
      link: "https://www.groupe-lpf.com/",
      description: [
        "Operated and programmed CNC machines for precision manufacturing.",
        "Performed quality checks to ensure parts met design specifications.",
        "Maintained and troubleshooted CNC equipment to minimize downtime.",
      ],
    },
  ];

  return (
    <section id='experience' className="min-h-screen flex items-center justify-center py-20">
      <ReviewOnScroll>
        <div className='max-w-5xl mx-auto px-4'>
          <h2 className='text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center '>Experience</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-8'>
            {experiences.map((exp, index) => (
              <ExperienceEntry key={index} title={exp.title} company={exp.company} date={exp.date} link={exp.link} description={exp.description} />
            ))}
          </div>
        </div>
      </ReviewOnScroll>
    </section>
  );
}

export default Experience;