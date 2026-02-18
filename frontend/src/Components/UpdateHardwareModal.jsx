import React, { useState, useEffect } from 'react';
import { useToast } from '../context/ToastContext';
import API_URL from '../config/api';

const UpdateHardwareModal = ({ hardware, onClose, onUpdate }) => {
  const toast = useToast();
  const [form, setForm] = useState({
    hardware_name: '',
    brand: '',
    category: '',
    price: '',
    specs: '',
    additional_notes: '',
    image: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    if (hardware) {
      setForm({
        hardware_name: hardware.hardware_name || '',
        brand: hardware.brand || '',
        category: hardware.category || '',
        price: hardware.price || '',
        specs: hardware.specs || '',
        additional_notes: hardware.additional_notes || '',
        image: hardware.image || ''
      });
      
      // Set current images
      if (hardware.images && Array.isArray(hardware.images) && hardware.images.length > 0) {
        setCurrentImages(hardware.images);
      } else if (hardware.image) {
        setCurrentImages([hardware.image]);
      } else {
        setCurrentImages([]);
      }
      setNewImages([]);
    }
  }, [hardware]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }

    // Convert FileList to Array and process each file
    const fileArray = Array.from(files);
    const readerPromises = fileArray.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readerPromises).then((results) => {
      setNewImages((prev) => [...prev, ...results]);
    });
  };

  const removeCurrentImage = (index) => {
    setCurrentImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.hardware_name.trim()) {
      toast.error('Hardware name is required');
      return;
    }

    setSubmitting(true);

    try {
      // Combine current images and new images
      const allImages = [...currentImages, ...newImages];

      console.log('Submitting update with:', {
        hardware_id: hardware.id,
        images_count: allImages.length,
        form_data: form
      });

      const response = await fetch(`${API_URL}/api/hardware/${hardware.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...form,
            images: allImages.length > 0 ? allImages : null
          })
        }
      );

      console.log('Response status:', response.status);

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to update hardware');
      }

      toast.success('Hardware updated successfully');
      onUpdate();
      onClose();
    } catch (err) {
      console.error('Update error:', err);
      toast.error(err.message || 'Failed to update hardware');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 w-full max-w-2xl my-8">
        <h3 className="text-lg font-semibold text-[#002044] mb-4">Update hardware</h3>
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

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            
            {/* Current Images */}
            {currentImages.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-600 mb-2">Current images (click X to delete):</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {currentImages.map((img, index) => (
                    <div key={`current-${index}`} className="relative group">
                      <img
                        src={img}
                        alt={`Current ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeCurrentImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold hover:bg-red-600 shadow-lg transition-colors"
                        title="Delete this image"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Images Preview */}
            {newImages.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-green-600 mb-2">New images to add (click X to remove):</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {newImages.map((img, index) => (
                    <div key={`new-${index}`} className="relative group">
                      <img
                        src={img}
                        alt={`New ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-green-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold hover:bg-red-600 shadow-lg transition-colors"
                        title="Remove this image"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload Button */}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="w-full text-sm text-gray-700"
            />
            <p className="mt-1 text-xs text-gray-500">
              Upload multiple images. You can select multiple files at once or add them one by one.
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

          <div className="md:col-span-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-md bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2 rounded-md bg-[#002044] text-white font-semibold hover:bg-[#00142C] transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            >
              {submitting ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateHardwareModal;
