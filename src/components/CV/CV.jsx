import GeneralInfo from '../GeneralInfo/GeneralInfo';
import Education from '../Education/Education';
import Experience from '../Experience/Experience';

const CV = () => {
  return (
    <main className="max-w-4xl mx-auto p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">CV Application</h1>
      <div className="grid gap-6">
        <GeneralInfo />
        <Education />
        <Experience />
      </div>
    </main>
  );
};

export default CV;
