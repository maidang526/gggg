import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">关于我们</h1>
            <p className="text-xl text-gray-600">致力于环境保护，建设可持续发展的未来</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">我们的使命</h2>
              <p className="text-gray-700 mb-6">
                我们致力于通过教育、研究和实际行动，推动环境保护意识的提升，促进可持续发展实践的推广，
                建设一个更加清洁、健康的地球家园。
              </p>
              <p className="text-gray-700">
                通过与各界合作伙伴的共同努力，我们希望能够为应对气候变化、保护生物多样性、
                减少污染等环境问题做出积极贡献。
              </p>
            </div>
            <div className="bg-green-100 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">核心价值观</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">可持续发展</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">科学态度</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">合作共赢</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">我们的影响力</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
                <div className="text-gray-700">环保项目</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">10000+</div>
                <div className="text-gray-700">志愿者</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
                <div className="text-gray-700">合作伙伴</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">加入我们</h2>
            <p className="text-gray-700 mb-8">
              如果您也关心环境保护，望为建设更美好的地球家园贡献一份力量，欢迎加入我们的团队。
            </p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors">
              成为志愿者
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 