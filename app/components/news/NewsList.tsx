'use client';

import { useState, useEffect } from 'react';
import { NewsItem, fetchCCTVNews } from '@/app/utils/fetchNews';
import OptimizedImage from '../ui/OptimizedImage';

interface NewsListProps {
  initialNews: NewsItem[];
}

export default function NewsList({ initialNews }: NewsListProps) {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  const refreshNews = async () => {
    setIsRefreshing(true);
    try {
      const freshNews = await fetchCCTVNews();
      setNews(freshNews);
    } catch (error) {
      console.error('Error refreshing news:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // 每5分钟自动刷新一次
  useEffect(() => {
    const interval = setInterval(refreshNews, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // 获取所有新闻分类
  const categories = ['全部', ...Array.from(new Set(news.map(item => item.category)))];

  // 过滤新闻
  const filteredNews = news.filter(item => {
    const matchesSearch = (
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.content && item.content.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    const matchesCategory = selectedCategory === '全部' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 获取外部链接
  const getExternalUrl = (category: string) => {
    switch (category) {
      case '气候变化':
        return 'https://www.ipcc.ch/';
      case '海洋保护':
        return 'https://www.unep.org/explore-topics/oceans-seas';
      case '能源革新':
        return 'https://www.irena.org/';
      case '生态保护':
        return 'https://www.iucn.org/';
      case '可持续发展':
        return 'https://sdgs.un.org/';
      case '科技创新':
        return 'https://www.unep.org/resources';
      default:
        return 'https://www.unep.org/';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* 搜索框 */}
          <div className="w-full md:w-96">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索新闻..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 rounded-full border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* 分类过滤器 */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${selectedCategory === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 刷新按钮 */}
          <button
            onClick={refreshNews}
            disabled={isRefreshing}
            className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${isRefreshing 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
              }`}
          >
            {isRefreshing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                刷新中...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                刷新新闻
              </>
            )}
          </button>
        </div>
      </div>

      {filteredNews.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">没有找到匹配的新闻</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item: NewsItem) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <a href={getExternalUrl(item.category)} target="_blank" rel="noopener noreferrer" className="block">
                {item.imageUrl && (
                  <div className="relative h-48">
                    <OptimizedImage
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      containerClassName="absolute inset-0"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                      {item.category}
                    </span>
                    <time className="text-sm text-gray-500">{item.date}</time>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 