import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchCCTVNews } from '../utils/fetchNews';
import NewsList from '../components/news/NewsList';

// 使用 Next.js 的静态生成，每5分钟重新生成一次
export const revalidate = 300;

export default async function NewsPage() {
  // 在服务端预加载新闻数据
  const initialNews = await fetchCCTVNews();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">最新资讯</h1>
            <p className="text-lg text-gray-600">
              了解最新的环保新闻和活动信息
            </p>
          </div>

          <NewsList initialNews={initialNews} />
        </div>
      </main>
      <Footer />
    </div>
  );
} 