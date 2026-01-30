import { useTranslation } from 'react-i18next';
import { useCV } from '../../context/CVContext';
import { X, Sliders, Palette, AlignLeft, AlignCenter, Type } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { cvData, updateSettings } = useCV();
  const { settings } = cvData;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <Sliders size={18} className="text-blue-600" />
            {t('settings.title')}
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Margins */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm font-medium text-gray-700">
                <span className="flex items-center gap-2"><Sliders size={16} /> {t('settings.margins')}</span>
                <span className="text-blue-600 font-bold">{settings.margins}cm</span>
            </div>
            <input
              type="range"
              min="1"
              max="4"
              step="0.1"
              value={settings.margins}
              onChange={(e) => updateSettings({ margins: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          {/* Header Color */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Palette size={16} /> {t('settings.headerColor')}
            </label>
            <div className="flex gap-3">
              {['#000000', '#1e40af', '#1e3a8a', '#312e81', '#111827'].map((color) => (
                <button
                  key={color}
                  onClick={() => updateSettings({ headerColor: color })}
                  className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                    settings.headerColor === color ? 'border-blue-500 scale-110' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
              <input 
                type="color" 
                value={settings.headerColor}
                onChange={(e) => updateSettings({ headerColor: e.target.value })}
                className="w-8 h-8 rounded-full border-2 border-transparent cursor-pointer p-0 overflow-hidden"
              />
            </div>
          </div>

          {/* Header Style */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <AlignCenter size={16} /> {t('settings.headerStyle')}
            </label>
            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={() => updateSettings({ headerStyle: 'center' })}
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg border-2 transition-all ${
                        settings.headerStyle === 'center' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-100 text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    <AlignCenter size={18} /> {t('settings.center')}
                </button>
                <button
                    onClick={() => updateSettings({ headerStyle: 'left' })}
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg border-2 transition-all ${
                        settings.headerStyle === 'left' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-100 text-gray-600 hover:bg-gray-50'
                    }`}
                >
                    <AlignLeft size={18} /> {t('settings.left')}
                </button>
            </div>
          </div>

          {/* Font Size */}
          <div className="space-y-3">
             <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Type size={16} /> {t('settings.fontSize')}
            </label>
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
                {['xs', 'sm', 'base'].map((size) => (
                    <button
                        key={size}
                        onClick={() => updateSettings({ fontSize: size })}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all ${
                            settings.fontSize === size 
                            ? 'bg-white text-blue-600 shadow-sm' 
                            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {t(`settings.${size}`)}
                    </button>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
};

export default SettingsModal;
