'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import OptimizedImage from '../../components/ui/OptimizedImage';

export default function PlasticFreeCampaignPage() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    commitment: '',
    participationType: '个人'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
    // 重置表单
    setFormData({
      name: '',
      email: '',
      phone: '',
      commitment: '',
      participationType: '个人'
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="relative h-96 mb-8 rounded-xl overflow-hidden">
            <OptimizedImage
              src="/images/plastic-free.jpg"
              alt="无塑生活"
              fill
              priority
              sizes="100vw"
              containerClassName="absolute inset-0"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white">无塑生活行动</h1>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">为什么要无塑？</h2>
                <ul className="space-y-3 text-gray-700">
                  <li>塑料污染威胁海洋生态系统</li>
                  <li>微塑料已进入食物链</li>
                  <li>塑料分解需要数百年时间</li>
                  <li>每年约800万吨塑料进入海洋</li>
                  <li>影响人类健康和环境安全</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">我们的目标</h2>
                <ul className="space-y-3 text-gray-700">
                  <li>减少一次性塑料产品的使用</li>
                  <li>推广可重复使用产品</li>
                  <li>提高塑料回收率</li>
                  <li>发展可降解替代品</li>
                  <li>提升公众环保意识</li>
                </ul>
              </div>
            </div>

            <div className="bg-green-50 p-8 rounded-xl mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">参与行动</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      参与类型
                    </label>
                    <select
                      value={formData.participationType}
                      onChange={(e) => setFormData({...formData, participationType: e.target.value})}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="个人">个人</option>
                      <option value="企业">企业</option>
                      <option value="学校">学校</option>
                      <option value="社区">社区</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      姓名/组织名称
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      电子邮箱
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      联系电话
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    我的承诺
                  </label>
                  <textarea
                    value={formData.commitment}
                    onChange={(e) => setFormData({...formData, commitment: e.target.value})}
                    rows={4}
                    placeholder="请描述您计划采取的无塑行动..."
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                  >
                    提交承诺
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">🌊</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">海洋保护</h3>
                <p className="text-gray-600">减少塑料污染，保护海洋生态</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">♻️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">循环利用</h3>
                <p className="text-gray-600">提高塑料回收率，推动循环经济</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">绿色生活</h3>
                <p className="text-gray-600">选择环保替代品，践行绿色生活</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* 成功提交弹窗 */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4">
            <div className="text-center">
              <div className="text-5xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">感谢您的参与！</h3>
              <p className="text-gray-600 mb-6">
                我们已收到您的承诺，后续将通过邮件通知您活动的进展。
                让我们一起为无塑地球努力！
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 