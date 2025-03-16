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
  const { data: contributors = [], isLoading, error } = useFetchContributors(
    'Cohort-6-Alumni',
    'yearbook-frontend',
    'Cohort-6-Alumni',
    'yearbook'
  );

  useEffect(() => {
    document.title = 'Obsidi Academy Alumni Yearbook';
  }, []);

  const itemsPerPage = {
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4
  };

  // Get the current itemsPerPage based on screen width
  const getCurrentItemsPerPage = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 640) return itemsPerPage.sm;
      if (width < 768) return itemsPerPage.md;
      if (width < 1024) return itemsPerPage.lg;
      return itemsPerPage.xl;
    }
    return itemsPerPage.md; // Default fallback
  };

  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(4);

  // Update items per page when window resizes
  useEffect(() => {
    const handleResize = () => {
      setCurrentItemsPerPage(getCurrentItemsPerPage());
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prevSlide = () => {
    if (!contributors?.length) return;
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? Math.ceil(contributors.length / currentItemsPerPage) - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    if (!contributors?.length) return;
    const isLastSlide = currentIndex === Math.ceil(contributors.length / currentItemsPerPage) - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const startIndex = currentIndex * currentItemsPerPage;
  const selectedContributors = contributors?.slice(startIndex, startIndex + currentItemsPerPage) || [];

  return (
    <div className="flex overflow-hidden flex-col px-3 sm:px-6 md:px-8 py-4 sm:py-8 md:py-11 bg-white">
      {/* Hero Section */}
      <section className="bg-opacity-30 py-6 sm:py-10 lg:py-16">
        <div className="bg-[#8627f115] flex flex-col items-center pt-4 sm:pt-6 pb-8 sm:pb-11 w-full mx-auto max-w-7xl overflow-hidden py-6 sm:py-10 px-3 sm:px-8 md:px-16 rounded-xl sm:rounded-2xl md:rounded-3xl">
          <LandingPageNavbar className="items-start"/>
          <div className="grid items-center grid-cols-1 gap-6 md:gap-8 lg:gap-12 lg:grid-cols-2">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-indigo-500 leading-tight sm:leading-snug md:leading-normal">
                The Obsidi <span className="font-medium text-violet-500">alumni</span> network &
                yearbook
              </h1>
              <p className="mt-3 sm:mt-4 md:mt-5 text-base sm:text-lg leading-relaxed sm:leading-loose text-zinc-600">
                The yearbook aims to document memories about the academy and inspire people who
                want to transition into tech.
              </p>
            </div>

            <div className="flex justify-center">
              <img
                loading="lazy"
                src={HeroGirl}
                alt="Graduate with diploma"
                className="object-contain w-3/4 sm:w-full max-w-sm lg:max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-8 sm:py-12 md:py-16">
        <div className="flex flex-col items-center mx-auto max-w-7xl">
          <h2 className="px-4 py-2 text-2xl sm:text-3xl md:text-4xl font-medium text-white bg-purple-600 text-center">
            ABOUT ALUMNI YEARBOOK
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center mt-8 sm:mt-10 md:mt-14 text-black w-full">
            <div className="lg:col-span-4 flex justify-center">
              <img
                loading="lazy"
                src={Journey}
                alt="Journey illustration"
                className="object-contain w-3/4 sm:w-full max-w-xs"
              />
            </div>
            
            <div className="flex flex-col lg:col-span-8">
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tighter text-center lg:text-left">
                WHERE JOURNEY BEGINS AND STORIES LIVES ON!
              </h3>
              
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 mt-6 sm:mt-8 md:mt-9 w-full">
                <div className="flex-1">
                  <h4 className="text-xl sm:text-2xl font-semibold tracking-wide text-center md:text-left">
                    ABOUT YEARBOOK
                  </h4>
                  <p className="mt-4 sm:mt-6 text-base sm:text-lg tracking-normal text-center md:text-left">
                    The Cohort 6 year book aims to celebrate our beginnings, showcase, our growth
                    and inspire future tech enthusiast through shared stories and lasting
                    connections
                  </p>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-xl sm:text-2xl font-semibold tracking-wide text-center md:text-left">
                    OUR VISION
                  </h4>
                  <p className="mt-4 sm:mt-6 text-base sm:text-lg tracking-normal text-center md:text-left">
                    To be the blueprint that inspires others to embark on their tech journey,
                    proving through our stories that with dedication, even the hardest challenges
                    can be overcome
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <Link
            to="/yearbook"
            className="inline-block py-3 sm:py-4 px-6 sm:px-10 mt-8 sm:mt-12 md:mt-20 text-base sm:text-lg font-medium text-center text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors"
          >
            View Yearbook
          </Link>
        </div>
      </section>

      {/* Contributors Section */}
      <section id="contributors" className="py-8 sm:py-12 md:py-16">
        <div className="bg-[#8627f115] flex flex-col items-center px-4 pt-6 pb-11 mx-auto max-w-7xl relative group rounded-xl">
          <header className="mt-6 sm:mt-8 md:mt-10 mb-6 sm:mb-8 md:mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase">Contributors</h2>
            <p className="mt-2 text-base sm:text-lg">Meet the developers</p>
          </header>
          
          <section className="overflow-hidden w-full">
            <div className="container mx-auto min-h-[200px] sm:min-h-[250px] md:min-h-[300px] flex items-center justify-center py-4">
              {/* Extract nested ternary into separate conditional rendering */}
              {isLoading && (
                <div className="text-center py-8">Loading contributors...</div>
              )}
              {!isLoading && error && (
                <div className="text-center text-red-500 py-8">
                  Error loading contributors: {error.message}
                </div>
              )}
              {!isLoading && !error && contributors?.length === 0 && (
                <div className="text-center py-8">No contributors found</div>
              )}
              {!isLoading && !error && contributors?.length > 0 && (
                <AnimatePresence initial={false}>
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
                  >
                    {selectedContributors.map((contributor, index) => (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{ scale: hoveredIndex === index ? 1.05 : 1 }}
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        key={contributor.id}
                        className="cursor-pointer"
                        onClick={() => window.open(contributor.html_url, '_blank')}
                      >
                        <ContributorCard
                          avatarUrl={contributor.avatar_url}
                          fullName={contributor.fullName}
                          githubHandle={contributor.login}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </section>
          
          {/* Navigation Controls */}
          {contributors?.length > currentItemsPerPage && (
            <>
              {/* Left Arrow */}
              <button
                className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-2 sm:left-3 md:left-5 text-xl sm:text-2xl rounded-full p-1 sm:p-2 bg-black/20 text-white cursor-pointer hover:bg-black/30 transition-colors"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <BsChevronCompactLeft size={24} />
              </button>
              
              {/* Right Arrow */}
              <button
                className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-2 sm:right-3 md:right-5 text-xl sm:text-2xl rounded-full p-1 sm:p-2 bg-black/20 text-white cursor-pointer hover:bg-black/30 transition-colors"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <BsChevronCompactRight size={24} />
              </button>
            </>
          )}
          
          {/* Pagination Dots */}
          {contributors?.length > 0 && (
            <div className="flex justify-center py-2 sm:py-3 mt-2 sm:mt-4">
              {Array.from({ length: Math.max(1, Math.ceil((contributors?.length || 0) / currentItemsPerPage)) }).map(
                (_, index) => (
                  <button
                    key={`pagination-dot-${index}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`text-xl sm:text-2xl cursor-pointer bg-transparent border-none p-0 mx-0.5 sm:mx-1 ${
                      index === currentIndex ? 'text-indigo-500' : 'text-gray-500'
                    }`}
                  >
                    <RxDotFilled />
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
