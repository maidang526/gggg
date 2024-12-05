'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import OptimizedImage from '../../components/ui/OptimizedImage';

export default function ForestCampaignPage() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    participationType: '个人',
    activityType: '植树',
    location: '',
    participants: '1',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
    // 重置表单
    setFormData({
      name: '',
      email: '',
      phone: '',
      participationType: '个人',
      activityType: '植树',
      location: '',
      participants: '1',
      message: ''
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="relative h-96 mb-8 rounded-xl overflow-hidden">
            <OptimizedImage
              src="/images/forest.jpg"
              alt="森林保护"
              fill
              priority
              sizes="100vw"
              containerClassName="absolute inset-0"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white">森林保护行动</h1>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">森林的重要性</h2>
                <ul className="space-y-3 text-gray-700">
                  <li>维持生态平衡</li>
                  <li>吸收二氧化碳</li>
                  <li>保护生物多样性</li>
                  <li>防止水土流失</li>
                  <li>提供生态系统服务</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">保护行动</h2>
                <ul className="space-y-3 text-gray-700">
                  <li>植树造林</li>
                  <li>森林管护</li>
                  <li>生态修复</li>
                  <li>科普教育</li>
                  <li>可持续利用</li>
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
                      活动类型
                    </label>
                    <select
                      value={formData.activityType}
                      onChange={(e) => setFormData({...formData, activityType: e.target.value})}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="植树">植树</option>
                      <option value="护林">护林</option>
                      <option value="科普">科普宣传</option>
                      <option value="调研">生态调研</option>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      预计参与人数
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.participants}
                      onChange={(e) => setFormData({...formData, participants: e.target.value})}
                      required
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    期望活动地点
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                    placeholder="请输入您期望的活动地点"
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    留言
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    placeholder="请输入您的想法或建议..."
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                  >
                    提交申请
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">🌳</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">植树造林</h3>
                <p className="text-gray-600">增加森林覆盖，改善生态环境</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">🦁</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">生物保护</h3>
                <p className="text-gray-600">保护野生动物，维护生态平衡</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">环保教育</h3>
                <p className="text-gray-600">普及环保知识，培养环保意识</p>
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
                我们已收到您的申请，后续将通过邮件通知您活动的具体安排。
                让我们一起守护绿色家园！
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