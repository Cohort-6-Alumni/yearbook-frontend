import { Spinner } from '@material-tailwind/react';
const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white">
      <Spinner color="indigo" className="h-10 w-10" />
    </div>
  );
};
export default Loader;
