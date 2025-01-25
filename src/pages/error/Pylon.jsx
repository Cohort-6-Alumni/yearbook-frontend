import { LuConstruction } from 'react-icons/lu';
const Pylon = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center p-5 bg-gray-100">
      <LuConstruction className="text-6xl text-gray-500" />
      <h1 className="text-2xl mb-4">Construction in Progress</h1>

      <p className="text-base">
        Our mobile view is currently under construction. Please visit us on a desktop for the best
        experience.
      </p>
    </div>
  );
};

export default Pylon;
