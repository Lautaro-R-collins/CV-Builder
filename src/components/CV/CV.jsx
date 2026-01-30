import { useTranslation } from 'react-i18next';
import { useCV } from '../../context/CVContext';

const CV = () => {
  const { t } = useTranslation();
  const { cvData } = useCV();
  const { generalInfo, education, experience, skills, languages, settings, courses } = cvData;

  const fontSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
  };

  return (
    <div 
        className={`bg-white text-black h-full w-full font-serif leading-relaxed ${fontSizes[settings.fontSize] || 'text-sm'}`}
        style={{ padding: `${settings.margins}cm` }}
    >
      {/* Header */}
      <header 
        className={`mb-4 border-b border-black pb-4 ${settings.headerStyle === 'center' ? 'text-center' : 'text-left'}`}
        style={{ color: settings.headerColor }}
      >
        <h1 
            className="text-3xl font-bold uppercase tracking-wide mb-2"
        >
            {generalInfo.fullName}
            {generalInfo.jobTitle && (
              <span className="ml-3 text-lg font-normal italic capitalize text-current opacity-80">
                {generalInfo.jobTitle}
              </span>
            )}
        </h1>
        <div className={`flex flex-wrap gap-x-4 ${settings.headerStyle === 'center' ? 'justify-center' : 'justify-start'} text-sm opacity-90`}>
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
          <h2 className="text-base font-bold uppercase border-b border-black mb-3">{t('cv.education')}</h2>
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
          <h2 className="text-base font-bold uppercase border-b border-black mb-3">{t('cv.experience')}</h2>
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
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase border-b border-black mb-3">{t('cv.skills')}</h2>
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

      {/* Courses */}
      {courses && courses.length > 0 && (
        <section className="mb-6">
          <h2 className="text-base font-bold uppercase border-b border-black mb-3">{t('cv.courses')}</h2>
          <div className="grid grid-cols-1 gap-2">
            {courses.map((course) => (
              <div key={course.id} className="flex justify-between items-baseline">
                <div>
                    <span className="font-bold">{course.name}</span>
                    <span className="mx-2">|</span>
                    <span className="italic">{course.organization}</span>
                </div>
                <span className="font-bold">{course.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section>
          <h2 className="text-base font-bold uppercase border-b border-black mb-3">{t('cv.languages')}</h2>
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
