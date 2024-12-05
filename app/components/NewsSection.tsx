import Link from 'next/link';
import OptimizedImage from './ui/OptimizedImage';

export default function NewsSection() {
  const news = [
    {
      title: "全球气候变化报告发布",
      description: "最新研究显示全球变暖速度加快，需要采取紧急行动",
      date: "2024-03-15",
      category: "气候变化",
      image: "/images/climate-report.jpg",
      link: "/news/climate-change-report"
    },
    {
      title: "海洋塑料污染持续恶化",
      description: "研究发现海洋中的塑料垃圾数量创历史新高",
      date: "2024-03-14",
      category: "海洋保护",
      image: "/images/ocean-pollution.jpg",
      link: "/news/ocean-plastic-pollution"
    },
    {
      title: "可再生能源发展突破性进展",
      description: "太阳能发电成本降至历史最低，推动能源转型",
      date: "2024-03-13",
      category: "能源革新",
      image: "/images/renewable-energy.jpg",
      link: "/news/renewable-energy-breakthrough"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">最新资讯</h2>
          <p className="text-xl text-gray-600">了解最新的环保动态和研究成果</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <Link href={item.link} key={index} className="block">
              <article className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
                <div className="relative h-48">
                  <OptimizedImage
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    containerClassName="absolute inset-0"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-green-600 bg-green-100 rounded-full">
                      {item.category}
                    </span>
                    <time className="text-sm text-gray-500 ml-4">{item.date}</time>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center text-green-600 font-medium">
                    阅读更多
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/news" className="inline-flex items-center px-6 py-3 border border-green-600 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition-colors">
            浏览所有新闻
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 