import React, { useState } from 'react';
import { Link } from 'react-router';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import ContributorCard from '../../components/ContributorCard.jsx';
import LandingPageNavbar from '../../components/LandingPageNavbar.jsx';
import { contributors } from '../../data/contributors.js';

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? contributors.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === contributors.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  
  return (
    <>
      <div className="flex overflow-hidden flex-col px-8 py-11 bg-white max-md:px-5">
        <section className=" bg-opacity-30 py-10 sm:py-16 lg:py-24">
          <div className="bg-[#8627f115] flex flex-col items-center pt-6 pb-11 mt-24 w-full max-md:px-5 max-md:mt-10 max-md:mr-1.5 max-md:max-w-full mx-auto max-w-7xl overflow-hidden py-10 pr-7 pl-16 max-md:px-5 max-md:mr-1.5 max-md:max-w-full rounded-3xl">
            <LandingPageNavbar />
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <div className="text-6xl font-light text-indigo-500 leading-[71px] max-md:max-w-full max-md:text-4xl max-md:leading-[57px]">
                  The Obsidi <span className="font-medium text-violet-500">alumni</span> network &
                  yearbook
                </div>
                <div className="mt-5 text-lg leading-9 text-zinc-600 max-md:max-w-full">
                  The yearbook aims to document memories about the academy and inspire people who
                  want to transition into tech.
                </div>
              </div>

              <div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/fdc3c41cbf0743359cb4456bd858c80a/883e606a4b3234fb4101a9240c9e4adb1d4093dda53f481da4c8660391616325?apiKey=fdc3c41cbf0743359cb4456bd858c80a&"
                  alt="Yearbook cover illustration"
                  className="object-contain grow w-full aspect-[1.06] max-md:mt-10 max-md:max-w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="flex flex-col items-center pt-6 pb-11 mx-auto max-w-7xl max-md:px-5 max-md:mt-10 max-md:mr-1.5 max-md:max-w-full">
            <h2 className="gap-2.5 self-center px-5 py-2.5 mt-32 ml-2.5 text-4xl font-medium text-white bg-purple-600 leading-[68px] max-md:mt-10 max-md:max-w-full">
              ABOUT ALUMNI YEARBOOK
            </h2>
            <div className="gap-8 grid grid-cols-12 justify-between items-center mt-14 text-black max-md:mt-10 w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/fdc3c41cbf0743359cb4456bd858c80a/fc70eb2016ae53b4b55d9d17be3678f2d16db4b7a5b7b0914f4cfb2cd4965f75?apiKey=fdc3c41cbf0743359cb4456bd858c80a&"
                alt="Alumni group photo"
                className="object-contain self-stretch my-auto aspect-[0.98] col-span-4"
              />
              <div className="flex flex-col self-stretch my-auto max-md:max-w-full col-span-8">
                <div className="text-7xl font-semibold tracking-tighter max-md:max-w-full max-md:text-4xl">
                  WHERE JOURNEY BEGINS AND STORIES LIVES ON!
                </div>
                <div className="flex gap-10 items-center mt-9 w-full max-md:max-w-full">
                  <div className="flex flex-col my-auto max-md:max-w-full">
                    <div className="text-2xl font-semibold tracking-wide max-md:max-w-full">
                      ABOUT YEARBOOK
                    </div>
                    <div className="mt-6 text-lg tracking-normal max-md:max-w-full">
                      The Cohort 6 year book aims to celebrate our beginnings, showcase, our growth
                      and inspire future tech enthusiast through shared stories and lasting
                      connections
                    </div>
                  </div>
                  <div className="flex flex-col my-auto max-md:max-w-full">
                    <div className="text-2xl font-semibold tracking-wide max-md:max-w-full">
                      OUR VISION
                    </div>
                    <div className="mt-6 text-lg tracking-normal max-md:max-w-full">
                      To be the blueprint that inspires others to embark on their tech journey,
                      proving through our stories that with dedication, even the hardest challenges
                      can be overcome
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Link
              to="/yearbook"
              className="gap-2.5 self-center py-4 pr-10 pl-10 mt-20 max-w-full text-lg font-medium text-center text-white bg-indigo-500 rounded-lg max-md:px-5 max-md:mt-10"
            >
              View Yearbook
            </Link>
          </div>
        </section>

        <section id="contributors">
          <div className="max-w-screen-xl h-screen w-full m-auto py-16 px-4 relative group">
            <div className="overflow-hidden">
              <div
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                className="flex transition-transform duration-500 ease-in-out"
              >
                {contributors.map((contributor, index) => (
                  <div
                    key={contributor.id}
                    className="min-w-[33.33%] max-md:min-w-full"
                  >
                    <ContributorCard {...contributor} />
                  </div>
                ))}
              </div>
            </div>
            {/* Left Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            {/* Right Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
            <div className="flex top-4 justify-center py-2">
              {contributors.map((_, index) => (
                <div
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="text-2xl cursor-pointer"
                >
                  <RxDotFilled />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
