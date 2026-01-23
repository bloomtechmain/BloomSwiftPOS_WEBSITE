import React from 'react';

const AboutBloomSwiftPOS = () => {
  return (
    <div className="bg-[#F5F7FB] min-h-screen font-['Poppins']">
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-gray-500 mb-3">
            ABOUT US
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#002044] mb-4">
            Our mission
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
            To empower merchants across the globe with AI-powered POS systems and embedded finance
            solutions, giving them the competitive edge to compete with giants.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop"
              alt="Bloom Swift POS terminal at a bar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002044] mb-4">
              From our beginning
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
              Bloom Swift POS was founded to solve the everyday challenges faced by small and
              growing businesses. From the start, our focus has been on building reliable,
              easy-to-use POS systems that help merchants spend less time worrying about technology
              and more time serving their customers.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              What began as a simple idea has grown into a complete platform for managing sales,
              inventory, staff and customer relationships in one place. Today, Bloom Swift POS
              continues to evolve with our customers, bringing modern tools and data-driven insights
              to businesses of every size.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutBloomSwiftPOS;

