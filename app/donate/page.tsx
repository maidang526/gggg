'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoginModal from '../components/auth/LoginModal';
import OptimizedImage from '../components/ui/OptimizedImage';

export default function DonatePage() {
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 检查用户是否已登录
    const userStr = localStorage.getItem('user');
    setIsLoggedIn(!!userStr);
  }, []);

  const donationAmounts = [
    { amount: 50, description: '提供一棵树苗' },
    { amount: 100, description: '支持海洋清洁' },
    { amount: 200, description: '资助环保教育' },
    { amount: 500, description: '保护濒危物种' },
  ];

  const handleDonate = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    
    // 如果已登录，跳转到仪表板
    router.push('/dashboard');
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setIsLoggedIn(true);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">支持环保事业</h1>
            <p className="text-xl text-gray-600">
              您的每一份捐助都将用于环境保护，建设更美好的地球家园
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <OptimizedImage
                src="/images/earth-hero.jpg"
                alt="环保捐助"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                containerClassName="absolute inset-0"
                className="object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">选择捐助金额</h2>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {donationAmounts.map(({ amount, description }) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`p-4 rounded-lg border-2 transition-colors
                      ${selectedAmount === amount
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-green-600'
                      }`}
                  >
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      ¥{amount}
                    </div>
                    <div className="text-sm text-gray-600">{description}</div>
                  </button>
                ))}
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  自定义金额
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500">¥</span>
                  <input
                    type="number"
                    min="1"
                    value={selectedAmount || ''}
                    onChange={(e) => setSelectedAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="输入金额"
                  />
                </div>
              </div>

              <button
                onClick={handleDonate}
                disabled={!selectedAmount}
                className={`w-full py-3 rounded-lg text-white text-lg font-medium transition-colors
                  ${selectedAmount
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-300 cursor-not-allowed'
                  }`}
              >
                立即捐助
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">🌳</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">植树造林</h3>
              <p className="text-gray-600">支持植树造林项目，增加森林覆盖</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">🌊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">海洋保护</h3>
              <p className="text-gray-600">保护海洋生态，减少塑料污染</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">环保教育</h3>
              <p className="text-gray-600">支持环保教育，提高公众意识</p>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">捐助流向</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">30%</div>
                <div className="text-gray-700">植树造林</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">25%</div>
                <div className="text-gray-700">海洋保护</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">25%</div>
                <div className="text-gray-700">生态修复</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">20%</div>
                <div className="text-gray-700">环保教育</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* 登录弹窗 */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
} 