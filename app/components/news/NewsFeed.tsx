'use client';

import { useEffect, useState } from 'react';
import { fetchCCTVNews, NewsItem } from '@/app/utils/fetchNews';
import OptimizedImage from '../ui/OptimizedImage';

function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const newsData = await fetchCCTVNews();
        setNews(newsData);
        setError(null);
      } catch (err) {
        setError('获取新闻数据失败，请稍后重试');
        console.error('Error loading news:', err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
        >
          重试
        </button>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="w-full text-center py-12">
        <p className="text-gray-600">暂无新闻数据</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {news.map((item: NewsItem) => (
        <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
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
              {item.description && (
                <p className="text-gray-600 line-clamp-3">{item.description}</p>
              )}
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default NewsFeed; 