import { Typography } from '@material-tailwind/react';

const currentYear = new Date().getFullYear();

const CustomFooter = () => {
  return (
    <footer className="w-full border-t-8 border-[#9260E2] bg-[#300f63] p-8">
      <div className="container mx-auto flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-[#300f63] text-center md:justify-between">
        <Typography color="white" className="text-center font-normal">
          Created with ❤️ by Cohort 6
        </Typography>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          {/* <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-blue-500"
            >
              About Us
            </Typography>
          </li> */}
          {/* <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              License
            </Typography>
          </li> */}
          <li>
            <Typography
              as="a"
              href="https://github.com/orgs/Cohort-6-Alumni/repositories"
              target="_blank"
              rel="noreferrer"
              color="white"
              className="font-normal transition-colors hover:text-blue-500"
            >
              Contribute
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="mailto:support@obsidialumniyearbook.com"
              target="_blank"
              rel="noreferrer"
              color="white"
              className="font-normal transition-colors hover:text-blue-500"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="container mx-auto my-8 border-blue-gray-50" />
      <Typography color="white" className="text-center font-normal">
        &copy; {currentYear} Obsidi Academy Alumni
      </Typography>
    </footer>
  );
};

export default CustomFooter;
