'use client';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import OptimizedImage from '../../components/ui/OptimizedImage';

export default function OceanCampaignPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="relative h-96 mb-8 rounded-xl overflow-hidden">
            <OptimizedImage
              src="/images/ocean-hero.jpg"
              alt="守护海洋"
              fill
              priority
              sizes="100vw"
              containerClassName="absolute inset-0"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white">守护海洋生态</h1>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">关于海洋保护</h2>
            <p className="text-gray-700 mb-6">
              海洋覆盖了地球表面的71%，是地球上最大的生态系统。然而，海洋正面临着前所未有的威胁：
              塑料污染、过度捕捞、海水酸化等问题日益严重。保护海洋，刻不容缓。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <OptimizedImage
                  src="/images/ocean-pollution.jpg"
                  alt="海洋塑料污染"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  containerClassName="absolute inset-0"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-2">塑料污染</h3>
                  <p className="text-white text-sm">
                    每年约有800万吨塑料垃圾进入海洋，威胁着海洋生物的生存。
                  </p>
                </div>
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden">
                <OptimizedImage
                  src="/images/plastic-free.jpg"
                  alt="减少塑料使用"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  containerClassName="absolute inset-0"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-2">行动方案</h3>
                  <p className="text-white text-sm">
                    推广可降解材料，建立海洋保护区，支持可持续渔业发展。
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">主要问题</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-blue-800 mb-4">塑料污染</h4>
                <p className="text-blue-700">
                  每年约有800万吨塑料垃圾进入海洋，威胁着海洋生物的生存。
                  如果不采取行动，到2050年海洋中的塑料可能比鱼类还多。
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="text-xl font-semibold text-blue-800 mb-4">过度捕捞</h4>
                <p className="text-blue-700">
                  全球约33%的鱼类资源已被过度开发，破坏了海洋生态平衡。
                  需要采取可持续的渔业管理措施。
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">我们的行动</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: "海滩清洁",
                  description: "组织志愿者定期进行海滩清洁活动",
                  icon: "🏖️"
                },
                {
                  title: "教育宣传",
                  description: "开展海洋环保教育和知识普及",
                  icon: "📚"
                },
                {
                  title: "政策倡议",
                  description: "推动海洋保护相关政策的制定",
                  icon: "📜"
                }
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-green-50 p-6 rounded-lg mb-8">
              <h4 className="text-xl font-semibold text-green-800 mb-4">如何参与</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    减少使用一次性塑料制品
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    选择可持续捕捞的海产品
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    参与海滩清洁志愿活动
                  </li>
                </ul>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    支持海洋保护组织
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    传播海洋保护知识
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2">✓</span>
                    践行环保生活方式
                  </li>
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