'use client';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OptimizedImage from '../components/ui/OptimizedImage';

export default function CampaignsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const campaigns = [
    {
      title: "零塑料行动",
      description: "减少一次性塑料使用，保护海洋生态环境",
      image: "/images/plastic-free.jpg",
      category: "海洋保护",
      content: "通过教育和实际行动，推动减少塑料使用，保护海洋生态环境。",
      link: "/campaigns/plastic-free"
    },
    {
      title: "气候变化与能源",
      description: "推动可再生能源发展，应对全球气候危机",
      image: "/images/climate-energy.jpg",
      category: "气候行动",
      content: "推广清洁能源使用，减少碳排放，应对气候变化。",
      link: "/campaigns/climate"
    },
    {
      title: "森林保护",
      description: "守护地球之肺，维护生物多样性",
      image: "/images/forest.jpg",
      category: "生态保护",
      content: "保护森林资源，维护生态平衡，保护野生动物栖息地。",
      link: "/campaigns/forest"
    },
    {
      title: "海洋生态保护",
      description: "保护海洋生态系统，维护海洋生物多样性",
      image: "/images/ocean-hero.jpg",
      category: "海洋保护",
      content: "通过各种措施保护海洋生态系统，维护海洋生物多样性。",
      link: "/campaigns/ocean"
    },
    {
      title: "地球日行动",
      description: "在地球日开展环保活动，提高环保意识",
      image: "/images/earth-hero.jpg",
      category: "公众参与",
      content: "组织地球日环保活动，提高公众环保意识。",
      link: "/campaigns/earth"
    },
    {
      title: "可再生能源推广",
      description: "推广太阳能等可再生能源使用",
      image: "/images/renewable-energy.jpg",
      category: "气候行动",
      content: "推广太阳能等可再生能源使用，减少化石燃料依赖。",
      link: "/campaigns/renewable"
    }
  ];

  const categories = ['all', '海洋保护', '气候行动', '生态保护', '公众参与'];

  const filteredCampaigns = activeFilter === 'all' 
    ? campaigns 
    : campaigns.filter(campaign => campaign.category === activeFilter);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">我们的环保行动</h1>
          
          {/* 分类过滤器 */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${activeFilter === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'
                  }`}
              >
                {category === 'all' ? '全部' : category}
              </button>
            ))}
          </div>

          {/* 行动卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCampaigns.map((campaign, index) => (
              <div
                key={campaign.title}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <div className="relative h-64">
                  <OptimizedImage
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    containerClassName="absolute inset-0"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 hover:bg-opacity-20" />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-green-600 rounded-full">
                      {campaign.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{campaign.title}</h2>
                  <p className="text-gray-600 mb-4">{campaign.description}</p>
                  <p className="text-gray-700 mb-6">{campaign.content}</p>
                  <button
                    onClick={() => window.location.href = campaign.link}
                    className="w-full bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors"
                  >
                    参与行动
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 如果没有匹配的结果 */}
          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                暂时没有合该分类的环保行动。
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
} 