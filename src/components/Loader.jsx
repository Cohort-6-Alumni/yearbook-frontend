import {ClipLoader} from "react-spinners";
const Loader = () => {
  return (
    <div className="h-screen flex justify-center items-center w-full">
      <div className="flex justify-center items-center h-500 w-full">
        <ClipLoader size={50} color="#9260e2" />
      </div>
    </div>
  );
};
export default Loader;
