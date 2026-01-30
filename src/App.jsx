import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download } from 'lucide-react';
import CV from './components/CV/CV';
import SideBar from './components/CV/SideBar';
import { CVProvider } from './context/CVContext';

function App() {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'My_CV',
  });

  return (
    <CVProvider>
      <div className="flex h-screen bg-gray-100 overflow-hidden font-inter">
        {/* Left Side: Editor (Sidebar) */}
        <aside className="w-1/3 min-w-[400px] h-full bg-white shadow-xl overflow-y-auto z-10 border-r border-gray-200">
          <SideBar />
        </aside>

        {/* Right Side: Preview */}
        <main className="flex-1 h-full overflow-y-auto p-8 flex flex-col items-center relative">
           {/* Floating Action Buttons */}
           <div className="fixed top-8 right-8 flex gap-4 z-20 print:hidden">
              <button
                onClick={() => handlePrint()}
                className="flex cursor-pointer items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all transform hover:scale-105 font-medium"
              >
                <Download size={20} />
                Download PDF
              </button>
           </div>

           {/* CV Preview Area */}
           <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl mb-10 print:shadow-none print:m-0 origin-top transform scale-[0.8] lg:scale-[0.85] xl:scale-100 transition-transform duration-300">
              <div ref={componentRef} className="w-full h-full">
                <CV />
              </div>
           </div>
        </main>
      </div>
    </CVProvider>
  );
}

export default App;
