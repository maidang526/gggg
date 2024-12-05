'use client';

import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import OptimizedImage from '../../components/ui/OptimizedImage';

export default function ClimateCampaignPage() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    participationType: '个人',
    commitmentType: '节能减排',
    organization: '',
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
      commitmentType: '节能减排',
      organization: '',
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
              src="/images/climate-energy.jpg"
              alt="气候行动"
              fill
              priority
              sizes="100vw"
              containerClassName="absolute inset-0"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white">气候行动</h1>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">气候变化的影响</h2>
                <ul className="space-y-3 text-gray-700">
                  <li>全球气温上升</li>
                  <li>极端天气频发</li>
                  <li>海平面上升</li>
                  <li>生态系统破坏</li>
                  <li>粮食安全威胁</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">应对措施</h2>
                <ul className="space-y-3 text-gray-700">
                  <li>发展清洁能源</li>
                  <li>节能减排</li>
                  <li>低碳生活</li>
                  <li>生态保护</li>
                  <li>科技创新</li>
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
                      承诺类型
                    </label>
                    <select
                      value={formData.commitmentType}
                      onChange={(e) => setFormData({...formData, commitmentType: e.target.value})}
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="节能减排">节能减排</option>
                      <option value="清洁能源">使用清洁能源</option>
                      <option value="低碳出行">低碳出行</option>
                      <option value="垃圾分类">垃圾分类</option>
                      <option value="环保宣传">环保宣传</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      姓名/联系人
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
                      组织/单位名称
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({...formData, organization: e.target.value})}
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
                    行动计划
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={4}
                    placeholder="请描述您的具体行动计划..."
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
                <div className="text-4xl mb-4">🌞</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">清洁能源</h3>
                <p className="text-gray-600">发展可再生能源，减少碳排放</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">🚲</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">低碳出行</h3>
                <p className="text-gray-600">选择绿色交通，减少碳足迹</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">节能行动</h3>
                <p className="text-gray-600">节约能源资源，践行低碳生活</p>
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">感谢您的承诺！</h3>
              <p className="text-gray-600 mb-6">
                我们已收到您的气候行动承诺，后续将通过邮件通知您活动的进展。
                让我们一起为保护地球气候贡献力量！
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