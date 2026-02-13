import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, Eye, Edit3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CV from './components/CV/CV';
import SideBar from './components/CV/SideBar';
import { CVProvider } from './context/CVContext';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  const { t } = useTranslation();
  const componentRef = useRef();
  const [viewMode, setViewMode] = useState('edit'); // 'edit' or 'preview'

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'My_CV',
  });

  return (
    <CVProvider>
      <div className="flex h-screen bg-gray-100 overflow-hidden font-inter">
        {/* Left Side: Editor (Sidebar) */}
        <aside 
          className={`
            ${viewMode === 'edit' ? 'block' : 'hidden md:block'} 
            w-full md:w-1/3 md:min-w-[400px] h-full bg-white shadow-xl overflow-y-auto z-10 border-r border-gray-200
          `}
        >
          <SideBar />
        </aside>

        {/* Right Side: Preview */}
        <main 
          className={`
            ${viewMode === 'preview' ? 'flex' : 'hidden md:flex'} 
            flex-1 h-full overflow-y-auto p-8 flex flex-col items-center relative
          `}
        >
           {/* Floating Action Buttons */}
           <div className="fixed top-8 right-8 flex items-center gap-4 z-20 print:hidden">
              <LanguageSwitcher />
              <button
                onClick={() => handlePrint()}
                className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all transform hover:scale-105 font-medium"
              >
                <Download size={20} />
                <span className="hidden sm:inline">{t('common.downloadPdf')}</span>
              </button>
           </div>

           {/* CV Preview Area */}
           <div className="w-full max-w-fit mb-20 print:m-0 origin-top transform scale-[0.4] min-[400px]:scale-[0.5] sm:scale-[0.6] md:scale-[0.8] lg:scale-[0.85] xl:scale-100 transition-transform duration-300">
              <div ref={componentRef} className="w-full">
                <CV />
              </div>
           </div>
        </main>

        {/* Mobile View Toggle Button */}
        <button
          onClick={() => setViewMode(viewMode === 'edit' ? 'preview' : 'edit')}
          className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full shadow-2xl z-30 font-semibold animate-in fade-in zoom-in duration-300 active:scale-95"
        >
          {viewMode === 'edit' ? (
            <>
              <Eye size={20} />
              <span>{t('common.preview')}</span>
            </>
          ) : (
            <>
              <Edit3 size={20} />
              <span>{t('common.edit')}</span>
            </>
          )}
        </button>
      </div>
    </CVProvider>
  );
}

export default App;
