import React, { useEffect, useState } from 'react';
import { CheckCircle, User, ArrowRight, Loader2 } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('processing'); // 'processing', 'success', 'error'
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const handleAuth = () => {
      try {
        // Extract token from URL using useSearchParams
        const token = searchParams.get('token');
        
        if (!token) {
          setStatus('error');
          return;
        }

        // Store token in localStorage
        localStorage.setItem('rec-bot-token', token);
        
        setStatus('success');
        
        // Start countdown and navigate to profile
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              navigate('/profile');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(timer);
        
      } catch (error) {
        console.error('Authentication error:', error);
        setStatus('error');
      }
    };

    handleAuth();
  }, [searchParams, navigate]);

  const handleContinue = () => {
    navigate('/profile');
  };

  const handleRetry = () => {
    navigate('/login');
  };

  if (status === 'processing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="animate-spin mb-6 mx-auto">
            <Loader2 className="w-16 h-16 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Processing Authentication
          </h2>
          <p className="text-gray-600">
            Please wait while we verify your credentials...
          </p>
          <div className="mt-6">
            <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full animate-pulse w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Authentication Failed
          </h2>
          <p className="text-gray-600 mb-8">
            We couldn't complete your sign-in. Please try again.
          </p>
          <button
            onClick={handleRetry}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
          >
            Try Again
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        {/* Success Animation */}
        <div className="mb-6">
          <div className="relative">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <CheckCircle className="w-12 h-12 text-green-600 animate-bounce" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full animate-float">
              <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome Back! 🎉
        </h2>
        <p className="text-gray-600 mb-8">
          You have successfully signed in to your account.
        </p>

        {/* Countdown */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">
              Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          Continue to Profile
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-6">
          Secured by your trusted authentication system
        </p>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-10 left-10 w-4 h-4 bg-blue-200 rounded-full animate-float opacity-60"></div>
      <div className="fixed top-20 right-20 w-3 h-3 bg-green-200 rounded-full animate-bounce opacity-60"></div>
      <div className="fixed bottom-20 left-20 w-5 h-5 bg-purple-200 rounded-full animate-pulse opacity-60"></div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AuthSuccess;