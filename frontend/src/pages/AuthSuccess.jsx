import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      localStorage.setItem('rec-bot-token', token);
      navigate('/profile');
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return null;
};

export default AuthSuccess;
