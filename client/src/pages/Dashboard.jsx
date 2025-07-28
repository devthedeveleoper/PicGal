import React from 'react';
import useUserStore from '../stores/userStore';
import Button from '../components/Button';
import UploadForm from '../components/UploadForm';
import Feed from '../components/Feed';

const Dashboard = () => {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">PicGal 🎨</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">Welcome, {user?.username}!</span>
            <Button onClick={logout}>Logout</Button>
          </div>
        </header>

        <main>
          <UploadForm />
          <h2 className="text-2xl font-semibold border-b border-gray-700 pb-2 mb-6 mt-12">Feed</h2>
          <Feed />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;