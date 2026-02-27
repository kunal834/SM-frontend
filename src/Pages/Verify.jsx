// src/pages/VerifyLink.jsx
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Crucial: withCredentials ensures the cookie from the backend is saved
        const res = await axios.post('http://localhost:5000/api/verify', 
          { token }, 
          { withCredentials: true } 
        );

        if (res.data.success) {
          navigate('/dashboard'); // Success!
        }
      } catch (err) {
        console.error("Verification failed", err);
        navigate('/login?error=invalid-link');
      }
    };

    if (token) verifyToken();
  }, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
      <p className="text-slate-600 font-medium">Verifying your secure link...</p>
    </div>
  );
};

export default Verify;