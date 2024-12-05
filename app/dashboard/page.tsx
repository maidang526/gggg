'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoveActions from '../components/dashboard/LoveActions';
import CarbonFootprint from '../components/dashboard/CarbonFootprint';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('love');

  useEffect(() => {
    // 检查用户是否登录
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      router.push('/');
      return;
    }

    setUser(JSON.parse(userStr));
  }, [router]);

  if (!user) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'love':
        return <LoveActions />;
      case 'carbon':
        return <CarbonFootprint />;
      default:
        return <LoveActions />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 用户信息 */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-20 w-20 rounded-full object-cover"
              />
              <div className="ml-6">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
          </div>

          {/* 标签页导航 */}
          <div className="bg-white rounded-lg shadow-lg mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('love')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors
                    ${activeTab === 'love'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  大爱之为
                </button>
                <button
                  onClick={() => setActiveTab('carbon')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 transition-colors
                    ${activeTab === 'carbon'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  碳足迹计算
                </button>
              </nav>
            </div>
          </div>

          {/* 内容区域 */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            {renderContent()}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 