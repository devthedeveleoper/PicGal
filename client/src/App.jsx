import React, { useEffect, useState } from 'react';
import useUserStore from './stores/userStore';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

// A simple layout for unauthenticated users to switch between Login and Register
const AuthLayout = () => {
  const [showLogin, setShowLogin] = useState(true);
  
  return (
    <div className="min-h-screen bg-gray-100">
      {showLogin ? <Login /> : <Register />}
      <div className="max-w-sm mx-auto text-center">
        <button onClick={() => setShowLogin(!showLogin)} className="text-sm text-blue-600 hover:underline">
          {showLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

function App() {
  const { isAuthenticated, isLoading, checkAuthStatus } = useUserStore();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading your session...</div>;
  }

  return isAuthenticated ? <Dashboard /> : <AuthLayout />;
}

export default App;