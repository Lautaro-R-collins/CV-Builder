import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, X, Check } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: t('common.english'), flag: '🇺🇸' },
    { code: 'es', label: t('common.spanish'), flag: '🇪🇸' },
  ];

  const toggleModal = () => setIsOpen(!isOpen);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <>
      {/* Language Button */}
      <button
        onClick={toggleModal}
        className="p-3 bg-white text-gray-700 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 border border-gray-100 flex items-center justify-center group relative cursor-pointer"
        title={t('common.language')}
      >
        <Globe size={24} className="group-hover:text-blue-600 transition-colors" />
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase">
          {i18n.language.split('-')[0]}
        </span>
      </button>

      {/* Language Selection Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <Globe size={18} className="text-blue-600" />
                {t('common.selectLanguage')}
              </h3>
              <button
                onClick={toggleModal}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Language Options */}
            <div className="p-4 space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                    i18n.language.startsWith(lang.code)
                      ? 'bg-blue-50 text-blue-700 border-2 border-blue-200 font-semibold'
                      : 'hover:bg-gray-50 text-gray-700 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <span>{lang.label}</span>
                  </div>
                  {i18n.language.startsWith(lang.code) && (
                    <Check size={18} className="text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Backdrop Click to Close */}
          <div className="absolute inset-0 -z-10" onClick={toggleModal} />
        </div>
      )}
    </>
  );
};

export default LanguageSwitcher;
