'use client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import OptimizedImage from '../../components/ui/OptimizedImage';

export default function EarthCampaignPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="relative h-96 mb-8 rounded-xl overflow-hidden">
            <OptimizedImage
              src="/images/earth-hero.jpg"
              alt="保护地球"
              fill
              priority
              sizes="100vw"
              containerClassName="absolute inset-0"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white">保护地球，刻不容缓</h1>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">关于这个行动</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <OptimizedImage
                  src="/images/climate-energy.jpg"
                  alt="气候变化"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  containerClassName="absolute inset-0"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-2">气候变化</h3>
                  <p className="text-white text-sm">
                    应对气候变化，推动可再生能源发展。
                  </p>
                </div>
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <OptimizedImage
                  src="/images/forest.jpg"
                  alt="森林保护"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  containerClassName="absolute inset-0"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-2">生态保护</h3>
                  <p className="text-white text-sm">
                    保护森林生态系统，维护生物多样性。
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">我们的目标</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: "减少碳排放",
                  description: "推动清洁能源使用，降低碳足迹",
                  icon: "🌱"
                },
                {
                  title: "保护生态",
                  description: "维护生物多样性，保护自然栖息地",
                  icon: "🌳"
                },
                {
                  title: "环保教育",
                  description: "提高公众环保意识和参与度",
                  icon: "📚"
                },
                {
                  title: "可持续发展",
                  description: "推动经济与环境的和谐发展",
                  icon: "♻️"
                }
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">如何参与</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-green-800 mb-4">个人行动</h4>
                <ul className="space-y-2">
                  {[
                    "节约用电用水，减少能源消耗",
                    "选择公共交通或低碳出行方式",
                    "减少使用一次性产品",
                    "参与环保志愿活动"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-green-700">
                      <span className="mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-blue-800 mb-4">企业责任</h4>
                <ul className="space-y-2">
                  {[
                    "采用清洁能源和环保技术",
                    "实施绿色办公政策",
                    "开发环保产品和服务",
                    "支持环保公益项目"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center text-blue-700">
                      <span className="mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button className="bg-green-600 text-white px-8 py-3 rounded-full text-lg hover:bg-green-700 transition-colors">
                立即参与行动
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 