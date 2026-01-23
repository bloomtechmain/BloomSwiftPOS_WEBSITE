import React, { useEffect, useState } from 'react';
import { useToast } from '../../context/ToastContext';

const lkrFormatter = new Intl.NumberFormat('en-LK', {
  style: 'currency',
  currency: 'LKR'
});

const Hardware = () => {
  const toast = useToast();
  const [hardware, setHardware] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [form, setForm] = useState({
    hardware_name: '',
    brand: '',
    price: '',
    specs: '',
    additional_notes: '',
    image: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchHardware = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/hardware');
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to load hardware list');
      }

      setHardware(data.data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message || 'Failed to load hardware list');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHardware();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setForm((prev) => ({ ...prev, image: '' }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.hardware_name.trim()) {
      toast.error('Hardware name is required');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/hardware', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to create hardware');
      }

      toast.success('Hardware added successfully');
      setForm({
        hardware_name: '',
        brand: '',
        category: '',
        price: '',
        specs: '',
        additional_notes: '',
        image: ''
      });
      setIsFormOpen(false);
      await fetchHardware();
    } catch (err) {
      toast.error(err.message || 'Failed to create hardware');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#002044]">Hardware</h2>
        <button
          onClick={() => setIsFormOpen((prev) => !prev)}
          className="px-4 py-2 rounded-md bg-[#FF7A00] text-white font-semibold hover:bg-[#E66E00] transition-colors"
        >
          {isFormOpen ? 'Close form' : 'Add new hardware'}
        </button>
      </div>

      {isFormOpen && (
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-[#002044] mb-4">New hardware</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hardware name
              </label>
              <input
                type="text"
                name="hardware_name"
                value={form.hardware_name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#002044] text-sm shadow-sm"
                placeholder="POS terminal, receipt printer, cash drawer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={form.brand}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent outline-none text-sm"
                placeholder="Brand name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent outline-none text-sm"
              >
                <option value="">Select category</option>
                <option value="Monitors">Monitors</option>
                <option value="Computers">Computers</option>
                <option value="Keyboard and mouse">Keyboard and mouse</option>
                <option value="Scanners">Scanners</option>
                <option value="Cash Drawers">Cash Drawers</option>
                <option value="Thermal Printers">Thermal Printers</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                name="price"
                value={form.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#002044] text-sm shadow-sm"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-700"
              />
              <p className="mt-1 text-xs text-gray-500">
                Optional. Upload a product image to store with this hardware.
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specs
              </label>
              <textarea
                name="specs"
                value={form.specs}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#002044] text-sm resize-none shadow-sm"
                placeholder="Key specifications, ports, compatibility details"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional notes
              </label>
              <textarea
                name="additional_notes"
                value={form.additional_notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#002044] text-sm resize-none shadow-sm"
                placeholder="Warranty, bundle info, installation notes"
              />
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 rounded-md bg-[#002044] text-white font-semibold hover:bg-[#00142C] transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-sm"
              >
                {submitting ? 'Saving...' : 'Save hardware'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && (
        <p className="text-gray-500 mb-4 text-sm">Loading hardware from database...</p>
      )}

      {error && !loading && (
        <p className="text-red-500 mb-4 text-sm">Failed to load hardware: {error}</p>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600 border-b">ID</th>
              <th className="p-4 text-sm font-semibold text-gray-600 border-b">Hardware name</th>
              <th className="p-4 text-sm font-semibold text-gray-600 border-b">Brand</th>
              <th className="p-4 text-sm font-semibold text-gray-600 border-b">Category</th>
              <th className="p-4 text-sm font-semibold text-gray-600 border-b">Price</th>
              <th className="p-4 text-sm font-semibold text-gray-600 border-b">Specs</th>
              <th className="p-4 text-sm font-semibold text-gray-600 border-b">Additional notes</th>
              <th className="p-4 text-sm font-semibold text-gray-600 border-b">Created at</th>
            </tr>
          </thead>
          <tbody>
            {hardware.length === 0 && !loading && !error && (
              <tr>
                <td
                  colSpan="7"
                  className="p-6 text-center text-gray-500 text-sm border-b"
                >
                  No hardware items found.
                </td>
              </tr>
            )}
            {hardware.map((item) => {
              const specsPreview =
                item.specs && item.specs.length > 80
                  ? `${item.specs.slice(0, 77)}...`
                  : item.specs || '-';
              const notesPreview =
                item.additional_notes && item.additional_notes.length > 80
                  ? `${item.additional_notes.slice(0, 77)}...`
                  : item.additional_notes || '-';

              let createdAtText = '-';
              if (item.created_at) {
                try {
                  const d = new Date(item.created_at);
                  createdAtText = d.toLocaleString();
                } catch {
                  createdAtText = item.created_at;
                }
              }

              return (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-4 border-b text-gray-700 whitespace-nowrap">#{item.id}</td>
                  <td className="p-4 border-b text-gray-700">
                    {item.hardware_name}
                  </td>
                  <td className="p-4 border-b text-gray-700">
                    {item.brand || '-'}
                  </td>
                  <td className="p-4 border-b text-gray-700">
                    {item.category || '-'}
                  </td>
                  <td className="p-4 border-b text-gray-700 whitespace-nowrap">
                    {item.price != null ? lkrFormatter.format(Number(item.price)) : '-'}
                  </td>
                  <td className="p-4 border-b text-gray-700 text-sm">
                    {specsPreview}
                  </td>
                  <td className="p-4 border-b text-gray-700 text-sm">
                    {notesPreview}
                  </td>
                  <td className="p-4 border-b text-gray-700 text-sm whitespace-nowrap">
                    {createdAtText}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hardware;
