import { useTranslation } from 'react-i18next';
import { useCV } from '../../context/CVContext';
import { useState, useLayoutEffect, useRef } from 'react';

const CV = () => {
  const { t } = useTranslation();
  const { cvData } = useCV();
  const { generalInfo, education, experience, skills, languages, settings, courses } = cvData;
  
  const [pages, setPages] = useState([]);
  const measureRef = useRef(null);

  const fontSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
  };

  // Convert mm to pixels (approximate, browser handles scaling)
  // We'll work with relative heights mostly
  const A4_HEIGHT_MM = 297;
  const MARGINS_MM = (settings.margins || 1) * 10; // cm to mm
  const MAX_CONTENT_HEIGHT_MM = A4_HEIGHT_MM - (MARGINS_MM * 2);

  useLayoutEffect(() => {
    if (!measureRef.current) return;

    const items = Array.from(measureRef.current.children);
    
    // Get precise heights including margins
    const itemHeights = items.map(item => {
      const rect = item.getBoundingClientRect();
      const style = window.getComputedStyle(item);
      const marginTop = parseFloat(style.marginTop);
      const marginBottom = parseFloat(style.marginBottom);
      return rect.height + marginTop + marginBottom;
    });
    
    // Use a hidden A4 page to get the PX height of one page.
    const testPage = document.createElement('div');
    testPage.style.height = '297mm';
    testPage.style.visibility = 'hidden';
    testPage.style.position = 'absolute';
    document.body.appendChild(testPage);
    const pxPerPage = testPage.getBoundingClientRect().height;
    const pxPerMargin = (MARGINS_MM * pxPerPage) / A4_HEIGHT_MM;
    const maxPxPerPage = pxPerPage - (pxPerMargin * 2);
    document.body.removeChild(testPage);

    const newPages = [];
    let currentPageItems = [];
    let currentHeight = 0;

    items.forEach((_, index) => {
      const height = itemHeights[index];
      // If adding this item exceeds the page, start a new page
      if (currentHeight + height > maxPxPerPage && currentPageItems.length > 0) {
        newPages.push(currentPageItems);
        currentPageItems = [index];
        currentHeight = height;
      } else {
        currentPageItems.push(index);
        currentHeight += height;
      }
    });

    if (currentPageItems.length > 0) {
      newPages.push(currentPageItems);
    }

    // Wrap in rAF to avoid "Calling setState synchronously within an effect" warning
    requestAnimationFrame(() => {
      setPages(newPages);
    });
  }, [cvData, settings, MARGINS_MM]);

  // Define component blocks to be measured/rendered
  const blocks = [];

  // 1. Header is ALWAYS first (as requested: "personal info goes up")
  blocks.push(
    <header 
      key="header"
      className={`mb-4 border-b border-black pb-4 ${settings.headerStyle === 'center' ? 'text-center' : 'text-left'}`}
      style={{ color: settings.headerColor }}
    >
      <h1 className="text-3xl font-bold uppercase tracking-wide mb-2">
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
  );

  // 2. Render other sections based on settings.sectionOrder
  const renderOrder = settings.sectionOrder || ['education', 'experience', 'skills', 'courses', 'languages'];

  renderOrder.forEach(sectionId => {
    switch (sectionId) {
      case 'education':
        if (education.length > 0) {
          blocks.push(<h2 key="edu-hdr" className="text-base font-bold uppercase border-b border-black mb-3 mt-4">{t('cv.education')}</h2>);
          education.forEach((edu) => {
            blocks.push(
              <div key={`edu-${edu.id}`} className="mb-3 text-justify">
                <div className="flex justify-between items-baseline font-bold capitalize">
                  <span>{edu.school}</span>
                  <span>{edu.location}</span>
                </div>
                <div className="flex justify-between items-baseline italic">
                  <span>{edu.degree}</span>
                  <span>{edu.dates}</span>
                </div>
                {edu.description && (
                    <p className="mt-1 whitespace-pre-line">{edu.description}</p>
                )}
              </div>
            );
          });
        }
        break;

      case 'experience':
        if (experience.length > 0) {
          blocks.push(<h2 key="exp-hdr" className="text-base font-bold uppercase border-b border-black mb-3 mt-4">{t('cv.experience')}</h2>);
          experience.forEach((exp) => {
            blocks.push(
              <div key={`exp-${exp.id}`} className="mb-4 text-justify">
                <div className="flex justify-between items-baseline font-bold capitalize">
                  <span>{exp.company}</span>
                  <span>{exp.location}</span>
                </div>
                <div className="flex justify-between items-baseline italic mb-1">
                  <span>{exp.role}</span>
                  <span>{exp.dates}</span>
                </div>
                 {exp.description && (
                    <p className="whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            );
          });
        }
        break;

      case 'skills':
        if (skills.length > 0) {
          blocks.push(<h2 key="sk-hdr" className="text-base font-bold uppercase border-b border-black mb-3 mt-4">{t('cv.skills')}</h2>);
          skills.forEach((skill) => {
              blocks.push(
                  <div key={`skill-${skill.id}`} className="flex mb-1">
                      <span className="font-bold min-w-[120px]">{skill.category}:</span>
                      <span>{skill.items}</span>
                  </div>
              );
          });
        }
        break;

      case 'courses':
        if (courses && courses.length > 0) {
          blocks.push(<h2 key="crs-hdr" className="text-base font-bold uppercase border-b border-black mb-3 mt-4">{t('cv.courses')}</h2>);
          courses.forEach((course) => {
            blocks.push(
              <div key={`course-${course.id}`} className="flex justify-between items-baseline mb-2">
                <div>
                    <span className="font-bold">{course.name}</span>
                    <span className="mx-2">|</span>
                    <span className="italic">{course.organization}</span>
                </div>
                <span className="font-bold">{course.date}</span>
              </div>
            );
          });
        }
        break;

      case 'languages':
        if (languages.length > 0) {
          blocks.push(<h2 key="lang-hdr" className="text-base font-bold uppercase border-b border-black mb-3 mt-4">{t('cv.languages')}</h2>);
          languages.forEach((language) => {
            blocks.push(
              <div key={`lang-${language.id}`} className="flex mb-1">
                <span className="font-bold min-w-[120px]">{language.language}:</span>
                <span>{language.level}</span>
              </div>
            );
          });
        }
        break;
      
      default:
        break;
    }
  });

  return (
    <div className={`w-full flex flex-col items-center gap-8 ${fontSizes[settings.fontSize] || 'text-sm'}`}>
      {/* Hidden measurement container */}
      <div 
        ref={measureRef}
        className="absolute opacity-0 pointer-events-none w-[210mm] font-serif leading-relaxed"
        style={{ padding: `${settings.margins}cm` }}
      >
        {blocks}
      </div>

      {/* Actual Pages */}
      {pages.length > 0 ? (
        pages.map((itemIndices, pageIdx) => (
          <div 
            key={pageIdx}
            className="bg-white text-black w-[210mm] h-[297mm] font-serif leading-relaxed relative shadow-lg print:shadow-none"
            style={{ padding: `${settings.margins}cm` }}
          >
            <div className="h-full overflow-hidden">
                {itemIndices.map(idx => blocks[idx])}
            </div>
            {/* Page Numbering */}
            <div className="absolute bottom-4 right-8 text-[10px] text-gray-400 font-sans">
                {pageIdx + 1} / {pages.length}
            </div>
          </div>
        ))
      ) : (
        /* Fallback / Initial load before measurement */
        <div 
          className="bg-white text-black w-[210mm] h-[297mm] font-serif leading-relaxed shadow-lg print:shadow-none"
          style={{ padding: `${settings.margins}cm` }}
        >
          {blocks}
        </div>
      )}
    </div>
  );
};

export default CV;
