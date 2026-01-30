import { useCV } from '../../context/CVContext';

const CV = () => {
  const { cvData } = useCV();
  const { generalInfo, education, experience, skills, languages } = cvData;



  return (
    <div className="bg-white text-black p-[2.5cm] h-full w-full font-serif leading-relaxed text-sm">
      {/* Header */}
      <header className="mb-4 text-center border-b border-black pb-4">
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-2">{generalInfo.fullName}</h1>
        <div className="flex flex-wrap justify-center gap-x-4 text-sm text-gray-800">
           {generalInfo.address && <span>{generalInfo.address}</span>}
           {generalInfo.phone && <span>{generalInfo.phone}</span>}
           {generalInfo.email && <span>{generalInfo.email}</span>}
           {generalInfo.linkedin && <span>{generalInfo.linkedin}</span>}
           {generalInfo.website && <span>{generalInfo.website}</span>}
        </div>
      </header>

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase border-b border-black mb-3">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline font-bold">
                <span>{edu.school}</span>
                <span>{edu.location}</span>
              </div>
              <div className="flex justify-between items-baseline italic">
                <span>{edu.degree}</span>
                <span>{edu.dates}</span>
              </div>
              {edu.description && (
                  <p className="mt-1 whitespace-pre-line text-justify">{edu.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase border-b border-black mb-3">Professional Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline font-bold">
                <span>{exp.company}</span>
                <span>{exp.location}</span>
              </div>
              <div className="flex justify-between items-baseline italic mb-1">
                <span>{exp.role}</span>
                <span>{exp.dates}</span>
              </div>
               {exp.description && (
                  <p className="whitespace-pre-line text-justify">{exp.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-base font-bold uppercase border-b border-black mb-3">Skills</h2>
          <div className="grid grid-cols-1 gap-1">
            {skills.map((skill) => (
              <div key={skill.id} className="flex">
                <span className="font-bold min-w-[120px]">{skill.category}:</span>
                <span>{skill.items}</span>
              </div>
            ))}
          </div>
        </section>
      )}
      {/* Lenguages */}
      {languages.length > 0 && (
        <section>
          <h2 className="text-base font-bold uppercase border-b border-black mb-3">Languages</h2>
          <div className="grid grid-cols-1 gap-1">
            {languages.map((language) => (
              <div key={language.id} className="flex">
                <span className="font-bold min-w-[120px]">{language.language}:</span>
                <span>{language.level}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CV;
