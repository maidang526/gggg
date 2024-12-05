import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'eco' | 'secondhand';
}

const products: Product[] = [
  {
    id: 1,
    name: "太阳能充电宝",
    description: "20000mAh大容量，太阳能快充，环保节能",
    price: 299,
    image: "/products/solar-charger.jpg",
    category: 'eco'
  },
  {
    id: 2,
    name: "可降解购物袋套装",
    description: "100%生物降解材料，承重5kg，可重复使用100次以上",
    price: 15,
    image: "/products/eco-bags.jpg",
    category: 'eco'
  },
  {
    id: 3,
    name: "智能节能LED灯泡",
    description: "超长寿命50000小时，支持智能调光，节能90%",
    price: 45,
    image: "/products/led-bulb.jpg",
    category: 'eco'
  },
  {
    id: 4,
    name: "竹制餐具套装",
    description: "天然竹材制作，无化学涂层，可降解环保",
    price: 68,
    image: "/products/bamboo-cutlery.jpg",
    category: 'eco'
  },
  {
    id: 5,
    name: "二手 iPad Pro 2021",
    description: "95新，完好无损，原装配件齐全",
    price: 3999,
    image: "/products/ipad.jpg",
    category: 'secondhand'
  },
  {
    id: 6,
    name: "二手自行车",
    description: "捷安特ATX，8成新，适合通勤代步",
    price: 800,
    image: "/products/bike.jpg",
    category: 'secondhand'
  },
  {
    id: 7,
    name: "二手显示器",
    description: "Dell P2419H，1年使用，无坏点",
    price: 600,
    image: "/products/monitor.jpg",
    category: 'secondhand'
  }
];

const EcoProducts = () => {
  const [activeCategory, setActiveCategory] = useState<'eco' | 'secondhand'>('eco');

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">环保市场</h2>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeCategory === 'eco'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setActiveCategory('eco')}
          >
            环保产品
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeCategory === 'secondhand'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setActiveCategory('secondhand')}
          >
            二手交换
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products
          .filter((product) => product.category === activeCategory)
          .map((product) => (
            <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full bg-gray-200 animate-pulse"></div>
              </div>
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-green-600 font-bold">¥{product.price}</span>
                <div className="space-x-2">
                  {activeCategory === 'secondhand' && (
                    <button className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 text-sm">
                      交换
                    </button>
                  )}
                  <button className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 text-sm">
                    {activeCategory === 'eco' ? '购买' : '收藏'}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {activeCategory === 'secondhand' && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-3">发布二手物品</h3>
          <button className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600">
            发布闲置物品
          </button>
        </div>
      )}
    </div>
  );
};

export default EcoProducts; 