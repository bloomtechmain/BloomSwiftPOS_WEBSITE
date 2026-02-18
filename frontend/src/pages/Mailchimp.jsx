import React from 'react';

const cards = [
  {
    title: 'Targeted Campaigns',
    description:
      "Set up automated workflows based on your customers' purchasing behaviors, so you can engage specific customers with relevant content.",
    image:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=900&auto=format&fit=crop',
  },
  {
    title: 'Detailed Analytics',
    description:
      'Quickly access detailed analytics on opens, clicks, and engagement rates so you can make informed business decisions.',
    image:
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=900&auto=format&fit=crop',
  },
  {
    title: 'Automation',
    description:
      'Build automated email campaigns that follow a set schedule to drive repeat business, collect feedback, and reward first‑time buyers.',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=900&auto=format&fit=crop',
  },
];

const Mailchimp = () => {
  return (
    <div className="bg-[#F5F7FB] min-h-screen px-4 py-12 font-['Poppins']">
      <div className="max-w-6xl w-full mx-auto space-y-24">
        <section className="min-h-[calc(100vh-80px)] flex items-center">
          <div className="w-full">
            <h1 className="text-center text-3xl sm:text-4xl font-bold text-[#002044] mb-10">
              How Mailchimp helps
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {cards.map((card) => (
                <div
                  key={card.title}
                  className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
                >
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-lg font-bold text-[#002044] mb-3">
                      {card.title}
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="min-h-[calc(100vh-80px)] flex items-center">
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col lg:flex-row">
              <div className="lg:w-1/2 relative h-72 sm:h-80 lg:h-96">
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1518057111178-44a106bad636?q=80&w=1200&auto=format&fit=crop"
                    alt="Bakery owner holding bread"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -left-6 sm:-left-10 bottom-6 sm:bottom-10 w-40 sm:w-52 bg-white rounded-xl shadow-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=600&auto=format&fit=crop"
                    alt="Campaign performance metrics"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -right-6 sm:-right-10 top-6 sm:top-10 w-40 sm:w-52 bg-white rounded-xl shadow-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
                    alt="Email campaign comparison chart"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="lg:w-1/2 flex items-center">
                <div className="p-8 lg:p-12">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#002044] mb-4">
                    Drag and drop email builder
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    With Mailchimp&apos;s easy-to-use email builder, there is no code required.
                    Choose from dozens of templates to create professional messages for your
                    customers and customize them with images, gifs, and products to help your
                    business stand out.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-[calc(100vh-80px)] flex items-center">
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col lg:flex-row">
              <div className="lg:w-1/2 relative h-72 sm:h-80 lg:h-96">
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop"
                    alt="Team collaborating at computers"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -left-6 sm:-left-10 bottom-6 sm:bottom-10 w-40 sm:w-52 bg-white rounded-xl shadow-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=600&auto=format&fit=crop"
                    alt="Campaign performance metrics"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -right-6 sm:-right-10 top-6 sm:top-10 w-40 sm:w-52 bg-white rounded-xl shadow-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
                    alt="Email campaign comparison chart"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="lg:w-1/2 flex items-center">
                <div className="p-8 lg:p-12">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#002044] mb-4">
                    Create customised emails
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    By importing your Bloom Swift POS customer data, you can greet shoppers by name
                    for more personal interactions. Mailchimp also lets you create custom messages
                    based on demographics, interests, and location so every email feels relevant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="min-h-[calc(100vh-80px)] flex items-center">
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col lg:flex-row">
              <div className="lg:w-1/2 flex items-center order-2 lg:order-1">
                <div className="p-8 lg:p-12">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#002044] mb-4">
                    Monitor email performance
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Mailchimp&apos;s powerful analytics tracks key metrics like open and clickthrough
                    rates so you can see how customers interact with your campaigns. For deeper
                    insights, you can run A/B tests to understand which content performs best.
                  </p>
                </div>
              </div>
              <div className="lg:w-1/2 order-1 lg:order-2 flex items-center justify-center p-6 lg:p-10">
                <div className="relative max-w-md w-full">
                  <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                    <img
                      src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=900&auto=format&fit=crop"
                      alt="Team reviewing email analytics dashboard on computers"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 flex items-center justify-center">
          <div className="w-full text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#002044] mb-4">
              Get started with Mailchimp
            </h2>
            <p className="max-w-3xl mx-auto text-sm sm:text-base text-gray-600 leading-relaxed mb-8">
              Bloom Swift POS and Mailchimp make it easy to create powerful campaigns that boost customer
              engagement. Setup only takes a few minutes, so you can start using Mailchimp today.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Mailchimp;
