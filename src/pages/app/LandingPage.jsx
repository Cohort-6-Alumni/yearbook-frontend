import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import ContributorCard from '../../components/ContributorCard.jsx';
import LandingPageNavbar from '../../components/LandingPageNavbar.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import HeroGirl from '../../images/hero-girl.png';
import Journey from '../../images/journey.png';
import useFetchContributors from '../../hooks/useFetchContributors.jsx';

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { contributors, loading, error } = useFetchContributors(
    'Cohort-6-Alumni',
    'yearbook-frontend',
    'Cohort-6-Alumni',
    'yearbook'
  );

  useEffect(() => {
    document.title = 'Obsidi Academy Alumni Yearbook';
  }, []);

  const itemsPerPage = 4;

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? Math.ceil(contributors.length / itemsPerPage) - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === Math.ceil(contributors.length / itemsPerPage) - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const startIndex = currentIndex * itemsPerPage;
  const selectedContributors = contributors.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="flex overflow-hidden flex-col px-8 py-11 bg-white max-md:px-5">
        <section className=" bg-opacity-30 py-10 sm:py-16 lg:py-8">
          <div className="bg-[#8627f115] flex flex-col items-center pt-6 pb-11 w-full max-md:px-5 max-md:mt-10 max-md:mr-1.5 max-md:max-w-full mx-auto max-w-7xl overflow-hidden py-10 pr-7 pl-16 max-md:px-5 max-md:mr-1.5 max-md:max-w-full rounded-3xl">
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
                  src={HeroGirl}
                  alt="hero image"
                  className="object-contain grow w-full aspect-[1.06] max-md:mt-10 max-md:max-w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="flex flex-col items-center pt-6 pb-11 mx-auto max-w-7xl max-md:px-5 max-md:mt-10 max-md:mr-1.5 max-md:max-w-full">
            <h2 className="gap-2.5 self-center px-5 py-2.5 ml-2.5 text-4xl font-medium text-white bg-purple-600 leading-[68px] max-md:mt-10 max-md:max-w-full">
              ABOUT ALUMNI YEARBOOK
            </h2>
            <div className="gap-8 grid grid-cols-12 justify-between items-center mt-14 text-black max-md:mt-10 w-full">
              <img
                loading="lazy"
                src={Journey}
                alt="Journey illustration"
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
          <div className="bg-[#8627f115] flex flex-col items-center px-4 pt-6 pb-11 mx-auto max-w-7xl max-md:px-5 max-md:mt-10 max-md:mr-1.5 max-md:max-w-full relative group">
            <header className="mt-10 mb-10 text-center">
              <h2 className="text-5xl font-bold uppercase">Contributors</h2>
              <p>Meet the developers</p>
            </header>
            <section className="overflow-hidden w-full">
              <div className="container mx-auto h-40 flex items-center justify-center">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  >
                    {selectedContributors.map((contributor, index) => (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.85 }}
                        animate={{ scale: hoveredIndex === index ? 1.1 : 0.9 }}
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        key={contributor.id}
                        className="cursor-pointer"
                        onClick={() => window.open(contributor.html_url, '_blank')}
                      >
                        <ContributorCard
                          key={contributor.id}
                          avatarUrl={contributor.avatar_url}
                          fullName={contributor.fullName}
                          githubHandle={contributor.login}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>
            {/* Left Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            {/* Right Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
            <div className="flex top-4 justify-center py-2">
              {Array.from({ length: Math.ceil(contributors.length / itemsPerPage) }).map(
                (_, index) => (
                  <div
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`text-2xl cursor-pointer ${index === currentIndex ? 'text-indigo-500' : 'text-gray-500'}`}
                  >
                    <RxDotFilled />
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LandingPage;
