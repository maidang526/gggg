import Link from 'next/link';
import OptimizedImage from './ui/OptimizedImage';

export default function CampaignSection() {
  const campaigns = [
    {
      title: "零塑料行动",
      description: "减少一次性塑料使用，保护海洋生态环境",
      image: "/images/plastic-free.jpg",
      link: "/campaigns/plastic-free"
    },
    {
      title: "气候变化与能源",
      description: "推动可再生能源发展，应对全球气候危机",
      image: "/images/climate-energy.jpg",
      link: "/campaigns/climate"
    },
    {
      title: "森林保护",
      description: "守护地球之肺，维护生物多样性",
      image: "/images/forest.jpg",
      link: "/campaigns/forest"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">我们的行动</h2>
          <p className="text-xl text-gray-600">加入我们的环保行动，共同守护地球家园</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <Link href={campaign.link} key={index} className="block">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <div className="relative h-48">
                  <OptimizedImage
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    containerClassName="absolute inset-0"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{campaign.title}</h3>
                  <p className="text-gray-600">{campaign.description}</p>
                  <div className="mt-4 flex items-center text-green-600 font-medium">
                    了解更多
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/campaigns" className="inline-flex items-center px-6 py-3 border border-green-600 text-green-600 rounded-full hover:bg-green-600 hover:text-white transition-colors">
            查看所有行动
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 