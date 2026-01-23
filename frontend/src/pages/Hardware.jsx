import React, { useEffect, useState } from 'react';

const lkrFormatter = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR'
});

const Hardware = () => {
  const [hardware, setHardware] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHardware = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5000/api/hardware');
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || 'Failed to load hardware');
        }

        setHardware(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHardware();
  }, []);

  const groupedHardware = hardware.reduce((acc, item) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  // Define category order
  const categoryOrder = [
    'Monitors',
    'Computers',
    'Keyboard and mouse',
    'Scanners',
    'Cash Drawers',
    'Thermal Printers',
    'Other'
  ];

  const categories = Object.keys(groupedHardware).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="min-h-screen bg-white font-['Poppins']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24 lg:pt-24">
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#002044] mb-4">
            Bloom Swift POS hardware
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Explore POS terminals, printers and accessories that work perfectly with Bloom Swift POS.
          </p>
        </div>

        {loading && (
          <p className="text-gray-500 mb-6 text-center text-sm">
            Loading hardware from database...
          </p>
        )}

        {error && !loading && (
          <p className="text-red-500 mb-6 text-center text-sm">
            Failed to load hardware: {error}
          </p>
        )}

        {hardware.length === 0 && !loading && !error && (
          <p className="text-gray-500 mb-6 text-center text-sm">
            No hardware has been added yet. Please check back later.
          </p>
        )}

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-bold text-[#002044] mb-6 border-b border-gray-200 pb-2">
              {category}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {groupedHardware[category].map((item) => {
                const specsPreview =
                  item.specs && item.specs.length > 120
                    ? `${item.specs.slice(0, 117)}...`
                    : item.specs || 'No specs provided yet.';

                const notesPreview =
                  item.additional_notes && item.additional_notes.length > 120
                    ? `${item.additional_notes.slice(0, 117)}...`
                    : item.additional_notes || '';

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 flex flex-col hover:shadow-md transition-shadow"
                  >
                    {item.image && (
                      <div className="mb-4">
                        <div className="w-full h-40 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                          <img
                            src={item.image}
                            alt={item.hardware_name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      </div>
                    )}

                    <div className="mb-4">
                      <h2 className="text-lg font-semibold text-[#002044]">
                        {item.hardware_name}
                      </h2>
                      {item.brand && (
                        <p className="text-sm text-gray-500 mt-1">
                          {item.brand}
                        </p>
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="text-sm text-gray-700 mb-3">
                        {specsPreview}
                      </p>
                      {notesPreview && (
                        <p className="text-xs text-gray-500">
                          {notesPreview}
                        </p>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm font-semibold text-[#002044]">
                        {item.price != null ? lkrFormatter.format(Number(item.price)) : 'Contact us for pricing'}
                      </div>
                      {/* <div className="text-xs text-gray-500">
                        ID #{item.id}
                      </div> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hardware;
