import { useTranslation } from 'react-i18next';
import { X, Info, GraduationCap, CheckCircle } from 'lucide-react';

const InfoModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Info size={18} className="text-blue-600" />
            {t('info.title')}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 cursor-pointer hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Harvard Section */}
          <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-3 mb-3 text-blue-800">
                <GraduationCap size={24} />
                <h4 className="font-bold text-lg">{t('info.harvardTitle')}</h4>
            </div>
            <p className="text-sm text-blue-900/80 leading-relaxed italic">
                {t('info.harvardText')}
            </p>
          </div>

          {/* ATS Section */}
          <div className="space-y-3">
            <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                <CheckCircle size={20} className="text-green-500" />
                {t('info.atsTitle')}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
                {t('info.atsText')}
            </p>
          </div>

          {/* Quick Tips */}
          <div className="border-t border-gray-100 pt-5 space-y-4">
            <h4 className="font-bold text-gray-800">{t('info.tipsTitle')}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[1, 2, 3].map((num) => (
                    <div key={num} className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-xs text-gray-700 flex flex-col gap-2">
                        <span className="font-bold text-blue-600">Tip #{num}</span>
                        {t(`info.tip${num}`)}
                    </div>
                ))}
            </div>
          </div>
        </div>
        
        {/* Footer info */}
        <div className="bg-gray-50 px-6 py-4 flex justify-center border-t border-gray-100">
           <button 
                onClick={onClose}
                className="px-8 py-2 cursor-pointer bg-gray-800 text-white rounded-full font-medium hover:bg-gray-900 transition-colors shadow-lg"
           >
             Got it!
           </button>
        </div>
      </div>
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
};

export default InfoModal;
