import React from "react";
import ServiceList from "../Components/admin/FetchServices";

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row relative py-16">
          {/* Left Content */}
          <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
            <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12"></span>
            <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
              Be on
              <span className="text-5xl sm:text-7xl">Time</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-700 dark:text-white mt-4">
              Transform your vision with WebDial! We're your partners in building powerful web applications, app
              development, graphic design, video and photo editing, management, and accounting solutions tailored for
              your startup, company, or organization. Let's elevate your brand together!
            </p>
            <div className="flex mt-8">
              <a
                href="./contact-us/"
                className="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-transparent text-white text-md mr-4 hover:bg-pink-400"
              >
                Get started
              </a>
              <a
                href="./about-us/"
                className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-pink-500 text-pink-500 dark:text-white hover:bg-pink-500 hover:text-white text-md"
              >
                Read more
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="sm:w-1/3 lg:w-3/5 relative mt-10 sm:mt-0">
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
              <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800">
                <img
                  src="https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen.png"
                  className="dark:hidden h-[156px] md:h-[278px] w-full rounded-lg"
                  alt="Laptop screen"
                />
                <img
                  src="https://flowbite.s3.amazonaws.com/docs/device-mockups/laptop-screen-dark.png"
                  className="hidden dark:block h-[156px] md:h-[278px] w-full rounded-lg"
                  alt="Laptop screen dark"
                />
              </div>
            </div>
            <div className="relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl rounded-t-sm h-[17px] max-w-[351px] md:h-[21px] md:max-w-[597px]">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-800"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-700 px-4 py-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-20"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br to-purple-400 from-blue-700"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-indigo-600"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="mb-10 space-y-4 px-6 md:px-0">
            <h2 className="text-center text-2xl font-bold text-white sm:text-3xl md:text-4xl">Services</h2>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {[
              { name: "Web Development", price: "₹5999", period: "Year" },
              { name: "SEO", price: "₹2000", period: "Year" },
              { name: "Video Editing", price: "₹5000", period: "Month" },
            ].map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center aspect-auto p-4 sm:p-8 border rounded-3xl bg-gray-800 border-gray-700 shadow-gray-600/10 shadow-none m-2 flex-1 max-w-md"
              >
                <h2 className="text-lg sm:text-xl font-medium text-white mb-2">{service.name}</h2>
                <p className="text-orange-500 text-xl">Starts From</p>
                <p className="text-lg sm:text-xl text-center mb-8 mt-4 text-gray-400">
                  <span className="text-3xl sm:text-4xl font-bold text-white">{service.price}</span> / {service.period}
                </p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lemonsqueezy-button relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-white before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                  href="./services/"
                >
                  <span className="relative text-sm font-semibold text-black">View More</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
     <ServiceList/>

      {/* Team Section */}
      <div className="relative py-16">
        <div
          aria-hidden="true"
          className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br from-teal-500 to-purple-400 dark:from-blue-700"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="relative">
            <div className="flex items-center justify-center -space-x-2">
              {["Aashi-thakur.webp", "om-mishra.png","vivek.png" ,"abhi.png", "kshama.webp","abhishek-roy.png", "jatin%20garg.png"].map((img, index) => (
                <img
                  key={index}
                  loading="lazy"
                  src={`https://www.webdial.in/imgs/team/${img}`}
                  alt="member photo"
                  className="h-8 w-8 rounded-full object-cover"
                />
              ))}
            </div>
            <div className="mt-6 m-auto space-y-6 md:w-8/12 lg:w-7/12">
              <h1 className="text-center text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">Get Started now</h1>
              <p className="text-center text-xl text-gray-600 dark:text-gray-300">
                Our team brings unparalleled expertise and understanding to every project, ensuring we deliver exactly
                what your business needs.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a
                  href="https://www.webdial.in/contact-us"
                  className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-teal-500 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                >
                  <span className="relative text-base font-semibold text-white dark:text-dark">Get Started</span>
                </a>
                <a
                  href="https://www.webdial.in/our-team"
                  className="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-teal-500/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                >
                  <span className="relative text-base font-semibold text-teal-500 dark:text-white">More about</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
