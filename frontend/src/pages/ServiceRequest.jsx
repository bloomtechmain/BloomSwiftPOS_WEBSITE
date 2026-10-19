import React, { useEffect, useState } from 'react';
import API_URL from '../config/api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { Eyebrow, Reveal, PrimaryButton, MediaFrame } from '../Components/kit';

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
      <section className="bg-grey-light min-h-[calc(100vh-80px)] flex items-center py-20">
        <div className="w-full px-4 sm:px-8 lg:px-12 flex justify-center">
          <div className="bg-white rounded-2xl shadow-[8px_8px_0_0_#101D36] p-8 lg:p-10 max-w-md w-full">
            <Eyebrow>Request for POS</Eyebrow>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy mb-4">
              Login required
            </h1>
            <p className="text-gray-600 mb-8">
              You need to be logged in to submit a Request for POS.
            </p>
            <PrimaryButton onClick={() => navigate('/')}>Back to home</PrimaryButton>
          </div>
        </div>
      </section>
    );
  }

  const label = 'block font-mono text-[11px] font-bold tracking-widest uppercase text-gray-500 mb-2';
  const input = 'w-full px-4 py-3.5 rounded-xl bg-grey-light border-0 text-navy placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-navy outline-none transition-all';

  return (
    <section className="bg-grey-light py-20 lg:py-24">
      <div className="w-full px-4 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <Reveal className="lg:col-span-5">
          <Eyebrow>Bloom Swift POS</Eyebrow>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.08] tracking-tight text-navy">
            Request for POS
          </h1>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed max-w-xl">
            Submit your details and our team will contact you about your Bloom Swift POS solution.
          </p>
          <div className="mt-10 hidden lg:block">
            <MediaFrame src="/images/general/handshake.webp" alt="Business owner shaking hands with a Bloom Swift POS consultant" />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7 bg-white rounded-2xl shadow-[8px_8px_0_0_#101D36] p-6 sm:p-8 lg:p-10">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="sr-username" className={label}>
              Username
            </label>
            <input
              id="sr-username"
              type="text"
              name="username"
              value={form.username}
              readOnly
              className={`${input} !bg-gray-100 text-gray-500 cursor-not-allowed`}
            />
          </div>

          <div>
            <label htmlFor="sr-servicetype" className={label}>
              Service type
            </label>
            <select
              id="sr-servicetype"
              name="servicetype"
              value={form.servicetype}
              onChange={handleChange}
              required
              className={input}
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

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="sr-company" className={label}>
                Company name
              </label>
              <input
                id="sr-company"
                type="text"
                name="company_name"
                value={form.company_name}
                onChange={handleChange}
                placeholder="Your business or company name"
                className={input}
              />
            </div>

            <div>
              <label htmlFor="sr-contact" className={label}>
                Contact number
              </label>
              <input
                id="sr-contact"
                type="tel"
                name="contactnumber"
                value={form.contactnumber}
                onChange={handleChange}
                required
                placeholder="Phone number with country code if applicable"
                className={input}
              />
            </div>
          </div>

          <div>
            <label htmlFor="sr-info" className={label}>
              Additional information
            </label>
            <textarea
              id="sr-info"
              name="additional_information"
              value={form.additional_information}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your business and requirements"
              className={`${input} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2.5 bg-brand-orange text-white font-bold py-4 rounded-xl hover:bg-brand-orange-dark transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-orange"
          >
            {isSubmitting && <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" aria-hidden="true" />}
            {isSubmitting ? 'Submitting...' : 'Submit request'}
          </button>
        </form>
        </Reveal>
      </div>
    </section>
  );
};

export default ServiceRequest;
