import axios from 'axios';

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  category: string;
  url: string;
  content?: string;
}

// 使用内存缓存存储新闻数据
let newsCache: {
  data: NewsItem[];
  timestamp: number;
} | null = null;

const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

// 环保新闻数据
export const environmentNews: NewsItem[] = [
  {
    id: '1',
    title: '全球气候变化报告：2023年或成为最热年份',
    description: '最新研究显示，全球气温持续上升，极端天气事件频发，各国需采取更积极的减排措施。',
    content: '根据世界气象组织（WMO）的最新报告，2023年可能成为有记录以来最热的一年。报告指出，全球平均气温继续攀升，极端天气事件频发，包括热浪、干旱、洪水等。专家呼吁各国采取更积极的减排措施，加快能源转型步伐。',
    imageUrl: '/images/climate-energy.jpg',
    date: '2024-03-15',
    category: '气候变化',
    url: '/news/climate-change-report'
  },
  {
    id: '2',
    title: '海洋塑料污染持续恶化，需要全球共同行动',
    description: '研究发现海洋中的塑料垃圾数量创历史新高，威胁海洋生态系统。',
    content: '最新海洋调查发现，海洋中的塑料污染问题日益严重，每年约有800万吨塑料垃圾进入海洋。这些塑料垃圾不仅威胁海洋生物的生存，还通过食物链影响人类健康。各国政府和环保组织呼吁采取紧急行动，减少塑料使用，加强海洋保护。',
    imageUrl: '/images/ocean-pollution.jpg',
    date: '2024-03-14',
    category: '海洋保护',
    url: '/news/ocean-plastic-pollution'
  },
  {
    id: '3',
    title: '可再生能源发展突破：太阳能成本创新低',
    description: '随着技术进步和规模化生产，太阳能发电成本持续下降，推动全球能源转型。',
    content: '国际可再生能源机构（IRENA）最新报告显示，太阳能发电成本已降至历史最低水平。得益于技术创新和规模化生产，太阳能已成为最具经济性的发电方式之一。这一突破将加速全球能源转型，助力实现碳中和目标。',
    imageUrl: '/images/climate-energy.jpg',
    date: '2024-03-13',
    category: '能源革新',
    url: '/news/renewable-energy-breakthrough'
  },
  {
    id: '4',
    title: '生物多样性保护：全球行动计划发布',
    description: '联合国发布最新生物多样性保护行动计划，呼吁各国加强保护措施。',
    content: '联合国《生物多样性公约》秘书处发布新的全球生物多样性保护行动计划。计划提出了具体的保护目标和措施，包括扩大保护区面积、恢复退化生态系统、加强物种保护等。各国承诺将加大投入，共同维护地球生物多样性。',
    imageUrl: '/images/forest.jpg',
    date: '2024-03-12',
    category: '生态保护',
    url: '/news/biodiversity-action-plan'
  },
  {
    id: '5',
    title: '绿色城市建设：可持续发展新模式',
    description: '多个城市推出绿色建筑标准，促进可持续城市发展。',
    content: '世界各地的城市正在积极推进绿色建筑和可持续城市发展。新的绿色建筑标准要求建筑在设计、施工和运营过程中最大限度地节约能源和资源，减少环境影响。这些措施将帮助城市应对气候变化，提高居民生活质量。',
    imageUrl: '/images/earth-hero.jpg',
    date: '2024-03-11',
    category: '可持续发展',
    url: '/news/green-city-development'
  },
  {
    id: '6',
    title: '环保科技创新：新型污染处理技术问世',
    description: '科研人员开发出新型环保材料，可高效处理工业污染物。',
    content: '科研团队成功开发出一种新型环保材料，能够高效处理工业废水中的重金属和有机污染物。这项技术具有处理效率高、成本低、环境友好等特点，有望在工业污染治理领域得到广泛应用，为环境保护提供新的技术支持。',
    imageUrl: '/images/climate-energy.jpg',
    date: '2024-03-10',
    category: '科技创新',
    url: '/news/environmental-tech-breakthrough'
  },
  {
    id: '7',
    title: '全球碳排放交易市场规模突破新高',
    description: '碳交易市场快速发展，助力全球减排目标实现。',
    content: '全球碳排放交易市场规模持续扩大，交易额创历史新高。越来越多的国家和地区加入碳交易体系，通过市场机制推动温室气体减排。专家认为，碳市场的发展将为全球应对气候变化提供重要经济动力。',
    imageUrl: '/images/climate-energy.jpg',
    date: '2024-03-09',
    category: '气候变化',
    url: '/news/carbon-market-growth'
  },
  {
    id: '8',
    title: '森林保护新技术：卫星监测系统升级',
    description: '先进卫星技术助力全球森林保护工作。',
    content: '最新升级的卫星森林监测系统投入使用，可实时监测全球森林覆盖变化。该系统利用人工智能技术，能够快速识别非法砍伐和森林退化情况，为森林保护工作提供及时准确的数据支持。',
    imageUrl: '/images/forest.jpg',
    date: '2024-03-08',
    category: '生态保护',
    url: '/news/forest-monitoring-tech'
  }
];

// 模拟异步获取新闻
async function fetchEnvironmentalNews(): Promise<NewsItem[]> {
  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // 随机排序新闻，模拟动态内容
    return [...environmentNews].sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error('Error fetching environmental news:', error);
    return environmentNews;
  }
}

export async function fetchCCTVNews(): Promise<NewsItem[]> {
  // 如果缓存存在且未过期，直接返回缓存数据
  if (newsCache && Date.now() - newsCache.timestamp < CACHE_DURATION) {
    return newsCache.data;
  }

  try {
    // 获取环保新闻
    const newsItems = await fetchEnvironmentalNews();
    
    // 更新缓存
    newsCache = {
      data: newsItems,
      timestamp: Date.now()
    };

    return newsItems;
  } catch (error) {
    console.error('Error fetching news:', error);
    return environmentNews;
  }
} 