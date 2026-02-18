import React, { useEffect, useState } from 'react';
import API_URL from '../config/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const ServiceRequest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const [currentUser, setCurrentUser] = useState(null);
  const [initialized, setInitialized] = useState(false);
  const [form, setForm] = useState({
    username: '',
    company_name: '',
    servicetype: '',
    contactnumber: '',
    additional_information: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let user = null;
    try {
      const stored = localStorage.getItem('bloom_user');
      user = stored ? JSON.parse(stored) : null;
    } catch {
      user = null;
    }

    setCurrentUser(user);

    const params = new URLSearchParams(location.search);
    const service = params.get('service') || '';

    setForm(prev => ({
      ...prev,
      username: user && user.username ? user.username : '',
      servicetype: service
    }));

    setInitialized(true);
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error('Please log in to submit a POS request.');
      return;
    }

    if (!form.contactnumber.trim()) {
      toast.error('Contact number is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const requestData = {
        ...form,
        user_id: currentUser.id,
        email: currentUser.email
      };

      const response = await fetch(`${API_URL}/api/service-requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Failed to submit request');
      }

      setForm(prev => ({
        ...prev,
        company_name: '',
        contactnumber: '',
        additional_information: ''
      }));

      if (data.emailStatus === 'failed') {
        toast.warning('Request submitted, but failed to send email notification.');
      } else {
        toast.success('Your POS request has been submitted successfully.');
      }

      navigate('/my-pos-requests', { replace: true });
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!initialized) {
    return null;
  }

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center font-['Poppins']">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#002044] mb-4">
            Login required
          </h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to submit a Request for POS.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-md bg-[#0055D4] text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center px-4 font-['Poppins']">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#002044] mb-2">
          Request for POS
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Submit your details and our team will contact you about your Bloom Swift POS solution.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service type
            </label>
            <select
              name="servicetype"
              value={form.servicetype}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent outline-none transition-all bg-white"
            >
              <option value="">Select a service</option>
              <option value="Retail POS">Retail POS</option>
              <option value="Hospitality POS">Hospitality POS</option>
              <option value="Restaurant POS">Restaurant POS</option>
              <option value="Car Wash POS">Car Wash POS</option>
              <option value="Garage Shops POS">Garage Shops POS</option>
              <option value="Cloud Based POS">Cloud Based POS</option>
              <option value="Bakery POS">Bakery POS</option>
              <option value="Bar POS">Bar POS</option>
              <option value="Convenience Store POS">Convenience Store POS</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company name
            </label>
            <input
              type="text"
              name="company_name"
              value={form.company_name}
              onChange={handleChange}
              placeholder="Your business or company name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact number
            </label>
            <input
              type="tel"
              name="contactnumber"
              value={form.contactnumber}
              onChange={handleChange}
              required
              placeholder="Phone number with country code if applicable"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional information
            </label>
            <textarea
              name="additional_information"
              value={form.additional_information}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your business and requirements"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#FF7A00] text-white font-bold py-3 rounded-lg hover:bg-[#E66E00] transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceRequest;
