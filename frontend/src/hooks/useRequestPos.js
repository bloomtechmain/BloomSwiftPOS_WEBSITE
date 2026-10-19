import { useNavigate } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

// Shared "Get Started" behaviour used across pages: require login, then open the POS request form.
export default function useRequestPos() {
  const navigate = useNavigate();
  const toast = useToast();

  return (service) => {
    let user = null;
    try {
      const stored = localStorage.getItem('bloom_user');
      user = stored ? JSON.parse(stored) : null;
    } catch {
      user = null;
    }
    if (!user) {
      toast.error('Please log in to submit a POS request.');
      return;
    }
    navigate(service ? `/request-pos?service=${encodeURIComponent(service)}` : '/request-pos');
  };
}
