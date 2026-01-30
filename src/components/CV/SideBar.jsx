import { useState } from 'react';
import { useCV } from '../../context/CVContext';
import {
  User,
  GraduationCap,
  Briefcase,
  Wrench,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
} from 'lucide-react';

const SectionTitle = ({ icon, title, section, activeSection, toggleSection }) => {
  const Icon = icon;
  return (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 border-b border-gray-200 transition-colors duration-200"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
          <Icon size={20} />
        </div>
        <span className="font-semibold text-gray-700">{title}</span>
      </div>
      {activeSection === section ? (
        <ChevronUp className="text-gray-400" size={20} />
      ) : (
        <ChevronDown className="text-gray-400" size={20} />
      )}
    </button>
  );
};

const InputGroup = ({ label, value, onChange, placeholder, type = 'text', className = '' }) => (
  <div className={`mb-4 ${className}`}>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow duration-200"
    />
  </div>
);

const SideBar = () => {
  const { cvData, updateGeneralInfo, addItem, updateItem, deleteItem } = useCV();
  const [activeSection, setActiveSection] = useState('general');

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleChange = (e, field, section = null, id = null) => {
    if (section === 'generalInfo') {
      updateGeneralInfo({ [field]: e.target.value });
    } else {
      updateItem(section, id, { [field]: e.target.value });
    }
  };

  return (
    <div className="flex flex-col h-full bg-white font-inter">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Editor</h2>
        <p className="text-sm text-gray-500 mt-1">Customize your resume sections</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* General Info Section */}
        <div className="border-b border-gray-200">
          <SectionTitle
            icon={User}
            title="Personal Information"
            section="general"
            activeSection={activeSection}
            toggleSection={toggleSection}
          />
          {activeSection === 'general' && (
            <div className="p-6 bg-white animate-in slide-in-from-top-2 duration-200">
              <InputGroup
                label="Full Name"
                value={cvData.generalInfo.fullName}
                onChange={(e) => handleChange(e, 'fullName', 'generalInfo')}
                placeholder="e.g. John Doe"
              />
              <InputGroup
                label="Email"
                type="email"
                value={cvData.generalInfo.email}
                onChange={(e) => handleChange(e, 'email', 'generalInfo')}
                placeholder="e.g. john@example.com"
              />
              <InputGroup
                label="Phone"
                value={cvData.generalInfo.phone}
                onChange={(e) => handleChange(e, 'phone', 'generalInfo')}
                placeholder="e.g. (555) 123-4567"
              />
              <InputGroup
                label="Location"
                value={cvData.generalInfo.address}
                onChange={(e) => handleChange(e, 'address', 'generalInfo')}
                placeholder="e.g. New York, NY"
              />
              <InputGroup
                label="LinkedIn"
                value={cvData.generalInfo.linkedin}
                onChange={(e) => handleChange(e, 'linkedin', 'generalInfo')}
                placeholder="e.g. linkedin.com/in/johndoe"
              />
              <InputGroup
                label="Website"
                value={cvData.generalInfo.website}
                onChange={(e) => handleChange(e, 'website', 'generalInfo')}
                placeholder="e.g. johndoe.com"
              />
            </div>
          )}
        </div>

        {/* Education Section */}
        <div className="border-b border-gray-200">
          <SectionTitle
            icon={GraduationCap}
            title="Education"
            section="education"
            activeSection={activeSection}
            toggleSection={toggleSection}
          />
          {activeSection === 'education' && (
            <div className="p-6 bg-white">
              {cvData.education.map((edu) => (
                <div key={edu.id} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 relative group">
                   <button
                    onClick={() => deleteItem('education', edu.id)}
                    className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                  <InputGroup
                    label="School / University"
                    value={edu.school}
                    onChange={(e) => handleChange(e, 'school', 'education', edu.id)}
                  />
                  <InputGroup
                    label="Degree"
                    value={edu.degree}
                    onChange={(e) => handleChange(e, 'degree', 'education', edu.id)}
                  />
                   <div className="grid grid-cols-2 gap-4">
                      <InputGroup
                        label="Dates"
                        value={edu.dates}
                        onChange={(e) => handleChange(e, 'dates', 'education', edu.id)}
                        placeholder="Aug 2018 - May 2022"
                      />
                      <InputGroup
                        label="Location"
                        value={edu.location}
                        onChange={(e) => handleChange(e, 'location', 'education', edu.id)}
                      />
                   </div>
                   <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={edu.description}
                      onChange={(e) => handleChange(e, 'description', 'education', edu.id)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 h-24 resize-none"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() => addItem('education', { school: '', degree: '', dates: '', location: '', description: '' })}
                className="w-full py-2 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium"
              >
                <Plus size={18} /> Add Education
              </button>
            </div>
          )}
        </div>

        {/* Experience Section */}
        <div className="border-b border-gray-200">
          <SectionTitle
            icon={Briefcase}
            title="Professional Experience"
            section="experience"
            activeSection={activeSection}
            toggleSection={toggleSection}
          />
          {activeSection === 'experience' && (
            <div className="p-6 bg-white">
              {cvData.experience.map((exp) => (
                <div key={exp.id} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 relative">
                   <button
                    onClick={() => deleteItem('experience', exp.id)}
                    className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                  <InputGroup
                    label="Company Name"
                    value={exp.company}
                    onChange={(e) => handleChange(e, 'company', 'experience', exp.id)}
                  />
                  <InputGroup
                    label="Role / Title"
                    value={exp.role}
                    onChange={(e) => handleChange(e, 'role', 'experience', exp.id)}
                  />
                   <div className="grid grid-cols-2 gap-4">
                      <InputGroup
                        label="Dates"
                        value={exp.dates}
                        onChange={(e) => handleChange(e, 'dates', 'experience', exp.id)}
                        placeholder="Jun 2022 - Present"
                      />
                      <InputGroup
                        label="Location"
                        value={exp.location}
                        onChange={(e) => handleChange(e, 'location', 'experience', exp.id)}
                      />
                   </div>
                   <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => handleChange(e, 'description', 'experience', exp.id)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-200 h-24 resize-none"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={() => addItem('experience', { company: '', role: '', dates: '', location: '', description: '' })}
                className="w-full py-2 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium"
              >
                <Plus size={18} /> Add Experience
              </button>
            </div>
          )}
        </div>

        {/* Skills Section */}
        <div className="border-b border-gray-200">
           <SectionTitle
            icon={Wrench}
            title="Skills"
            section="skills"
            activeSection={activeSection}
            toggleSection={toggleSection}
          />
           {activeSection === 'skills' && (
            <div className="p-6 bg-white">
              {cvData.skills.map((skill) => (
                <div key={skill.id} className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 relative flex flex-col gap-3">
                   <button
                    onClick={() => deleteItem('skills', skill.id)}
                    className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                  <InputGroup
                    label="Category"
                    value={skill.category}
                    onChange={(e) => handleChange(e, 'category', 'skills', skill.id)}
                    placeholder="e.g. Languages"
                    className="mb-0"
                  />
                   <InputGroup
                    label="Skills List"
                    value={skill.items}
                    onChange={(e) => handleChange(e, 'items', 'skills', skill.id)}
                    placeholder="e.g. Java, Python, C++"
                    className="mb-0"
                  />
                </div>
              ))}
               <button
                onClick={() => addItem('skills', { category: '', items: '' })}
                className="w-full py-2 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium"
              >
                <Plus size={18} /> Add Skill Group
              </button>
            </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
