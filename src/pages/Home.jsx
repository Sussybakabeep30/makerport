import React from "react";
import { useUser } from "../context/UserContext";
import LoginBox from "../components/LoginBox";
import Foot from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  const { isLoggedIn, email, logout } = useUser();

  return (
    <div className="animate-fade-in">
      <Navbar />

      <section className="w-full bg-blue-600 min-h-[400px] sm:min-h-[500px] md:min-h-[600px]">
        <div className="bg-gradient-to-br from-primary-800 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
            <div className="md:flex md:items-center md:justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                  Bringing your imagination to life through 3D printing
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-primary-100 mb-6 sm:mb-8">
                  Hi, I'm a 3D printing enthusiast building custom parts,
                  models, and prototypes.
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <a
                    href="/portfolio"
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white text-primary-800 hover:bg-orange-500 font-semibold rounded-md hover:bg-primary-50 transition-colors text-sm sm:text-base"
                  >
                    View my work
                    <span className="ml-2">→</span>
                  </a>
                  <a
                    href="/client-form"
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white text-primary-800 hover:bg-orange-500 font-semibold rounded-md hover:bg-primary-50 transition-colors text-sm sm:text-base"
                  >
                    Start a project
                  </a>
                </div>
              </div>

              <div className="md:w-1/3 bg-white p-4 sm:p-6 rounded-lg shadow-lg mt-8 md:mt-0">
                {isLoggedIn ? (
                  <div className="text-center">
                    <div className="inline-block p-2 sm:p-3 bg-primary-100 rounded-full mb-3 sm:mb-4">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 text-primary-600 text-2xl sm:text-3xl">
                        🖨️
                      </div>
                    </div>
                    <h2 className="text-indigo-400 text-xl sm:text-2xl font-bold mb-2">
                      Welcome back!
                    </h2>
                    <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                      You're logged in as{" "}
                      <span className="font-semibold break-words">{email}</span>
                    </p>
                    <div className="space-y-3 sm:space-y-4">
                      <button
                        onClick={() => {
                          // Format the message for WhatsApp
                          const formattedMessage = `Hello! I'd like to check the status of my 3D printing project.`;

                          const encodedMessage =
                            encodeURIComponent(formattedMessage);

                          const phoneNumber = "+918169891989"; // WhatsApp number with country code

                          //redirection
                          window.open(
                            `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
                            "_blank"
                          );
                        }}
                        className="block w-full px-3 sm:px-4 py-2 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 transition-colors text-sm sm:text-base"
                      >
                        Check status via WhatsApp
                      </button>
                      <button
                        onClick={logout}
                        className="block w-full px-3 sm:px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors text-sm sm:text-base"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <LoginBox />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 bg-white sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            What I Can Create For You
          </h2>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
            From practical mechanical parts to artistic models and innovative
            gadgets - if you can imagine it, I can print it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-xl">
            <div className="h-40 sm:h-48 bg-gray-200 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/5726837/pexels-photo-5726837.jpeg"
                alt="Mechanical Parts"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Mechanical Parts
              </h3>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Precise, functional components for various applications. From
                replacement parts to custom-designed mechanisms.
              </p>
              <a
                href="/portfolio"
                className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium text-sm sm:text-base"
              >
                View mechanical projects
                <span className="ml-1">→</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-xl">
            <div className="h-40 sm:h-48 bg-gray-200 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/2683772/pexels-photo-2683772.jpeg"
                alt="Artistic Models"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Artistic Models
              </h3>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Bring your creative vision to life with detailed sculptures,
                figurines, and decorative pieces.
              </p>
              <a
                href="/portfolio"
                className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium text-sm sm:text-base"
              >
                View artistic projects
                <span className="ml-1">→</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-xl">
            <div className="h-40 sm:h-48 bg-gray-200 overflow-hidden">
              <img
                src="https://images.pexels.com/photos/4195509/pexels-photo-4195509.jpeg"
                alt="Gadgets"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                Gadgets
              </h3>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Practical innovations to solve everyday problems. From phone
                stands to cable organizers and custom fixtures.
              </p>
              <a
                href="/portfolio"
                className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium text-sm sm:text-base"
              >
                View gadget projects
                <span className="ml-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Foot />
    </div>
  );
};

export default Home;
