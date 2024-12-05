import React, { useState } from 'react';
import Image from 'next/image';
import ShoppingCart from './ShoppingCart';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  details: string;
  impact: string;
  stock: number;
}

interface SecondHandItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  condition: string;
  owner: string;
  exchangeFor: string[];
  location: string;
  stock: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  type: 'eco' | 'secondhand';
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "太阳能便携充电站",
    description: "便携式太阳能发电站，支持多设备同时充电",
    price: 1299,
    image: "/products/solar-station.jpg",
    category: "清洁能源",
    details: "容量: 40000mAh\n输出功率: 100W\n太阳能转化效率: 23%\n防水等级: IP65\n重量: 1.2kg\n尺寸: 22x15x3.8cm",
    impact: "每年可减少约200kg碳排放，相当于种植10棵树",
    stock: 999
  },
  {
    id: 2,
    name: "竹纤维餐具套装",
    description: "100%天然竹纤维制作，可降解环保餐具",
    price: 89,
    image: "/products/bamboo-set.jpg",
    category: "日常用品",
    details: "材质: 天然竹纤维\n套装包含: 4套餐具\n使用寿命: 2年\n可降解时间: 180天\n无BPA\n可微波加热",
    impact: "替代约100套一次性餐具，减少塑料污染",
    stock: 999
  },
  {
    id: 3,
    name: "智能节水花洒",
    description: "高效节水花洒，带水流量监测和温度显示",
    price: 299,
    image: "/products/shower-head.jpg",
    category: "节水产品",
    details: "节水率: 65%\n流量: 3种模式\n温度显示: LED彩屏\n供电: 水压发电\n材质: 环保ABS\n安装方式: 通用接口",
    impact: "每年节约12000升水，减少约48kg碳排放",
    stock: 999
  },
  {
    id: 4,
    name: "智能垃圾分类桶",
    description: "AI识别垃圾类型，自动分类，语音提示",
    price: 599,
    image: "/products/smart-bin.jpg",
    category: "智能家居",
    details: "容量: 45L(4个桶)\nAI识别准确率: 95%\n充电方式: Type-C\n待机时间: 30天\n材质: 可回收PP\n尺寸: 60x40x50cm",
    impact: "提高垃圾回收率40%，减少填埋场污染",
    stock: 999
  },
  {
    id: 5,
    name: "有机蔬菜种植箱",
    description: "智能家用水培种植系统，支持12种蔬菜同时种植",
    price: 899,
    image: "/products/plant-box.jpg",
    category: "绿色生活",
    details: "种植空间: 12格\n光照: 全光谱LED\n水箱容量: 5L\n智能控制: APP远程监控\n支持植物: 30+种\n尺寸: 60x30x45cm",
    impact: "减少碳排放50kg/年，无农药残留",
    stock: 999
  }
];

const secondHandItems: SecondHandItem[] = [
  {
    id: 1,
    name: "2022款 iPad Pro 11寸",
    description: "95新，无划痕，原装配件齐全，已贴膜",
    price: 4500,
    image: "/products/ipad.jpg",
    condition: "95新",
    owner: "张先生",
    exchangeFor: ["笔记本电脑", "相机", "手机"],
    location: "北京",
    stock: 999
  },
  {
    id: 2,
    name: "捷安特自行车 ATX",
    description: "骑行3000公里，定期保养，适合通勤",
    price: 1200,
    image: "/products/bike.jpg",
    condition: "8成新",
    owner: "李女士",
    exchangeFor: ["滑板", "健身器材"],
    location: "上海",
    stock: 999
  },
  {
    id: 3,
    name: "DELL 27寸显示器",
    description: "P2719H，IPS屏幕，1年使用，无坏点",
    price: 1000,
    image: "/products/monitor.jpg",
    condition: "9成新",
    owner: "王先生",
    exchangeFor: ["笔记本电脑", "平板电脑"],
    location: "广州",
    stock: 999
  },
  {
    id: 4,
    name: "索尼 WH-1000XM4 耳机",
    description: "9成新，音质完美，配件齐全",
    price: 1500,
    image: "/products/headphone.jpg",
    condition: "9成新",
    owner: "赵女士",
    exchangeFor: ["耳机", "音响"],
    location: "深圳",
    stock: 999
  }
];

interface NewItemForm {
  name: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  exchangeFor: string;
  images: File[];
}

const LoveActions = () => {
  const [activeTab, setActiveTab] = useState<'eco' | 'secondhand'>('eco');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSecondHand, setSelectedSecondHand] = useState<SecondHandItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showExchangeForm, setShowExchangeForm] = useState(false);
  const [exchangeMessage, setExchangeMessage] = useState('');
  const [newItem, setNewItem] = useState<NewItemForm>({
    name: '',
    description: '',
    price: 0,
    category: '',
    condition: '',
    exchangeFor: '',
    images: []
  });
  const [showCart, setShowCart] = useState(false);
  const [productStock, setProductStock] = useState<Record<number, number>>(() => {
    const stock: Record<number, number> = {};
    products.forEach(p => stock[p.id] = p.stock);
    secondHandItems.forEach(p => stock[p.id] = p.stock);
    return stock;
  });

  const handleAddToCart = (item: Product | SecondHandItem, type: 'eco' | 'secondhand') => {
    const existingItem = cartItems.find(i => i.id === item.id);
    if (existingItem) {
      const newQuantity = existingItem.quantity + 1;
      if (newQuantity <= productStock[item.id]) {
        setCartItems(
          cartItems.map(i =>
            i.id === item.id ? { ...i, quantity: newQuantity } : i
          )
        );
        setProductStock(prev => ({
          ...prev,
          [item.id]: prev[item.id] - 1
        }));
      } else {
        alert('库存不足！');
      }
    } else {
      if (productStock[item.id] > 0) {
        setCartItems([
          ...cartItems,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            type,
            image: item.image
          }
        ]);
        setProductStock(prev => ({
          ...prev,
          [item.id]: prev[item.id] - 1
        }));
      } else {
        alert('库存不足！');
      }
    }
    alert('已添加到购物车！');
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    const item = cartItems.find(i => i.id === id);
    if (!item) return;

    const currentStock = productStock[id];
    const currentQuantity = item.quantity;
    const stockDiff = currentQuantity - quantity;

    if (stockDiff < 0 && Math.abs(stockDiff) > currentStock) {
      alert('库存不足！');
      return;
    }

    setCartItems(
      cartItems.map(i =>
        i.id === id ? { ...i, quantity } : i
      ).filter(i => i.quantity > 0)
    );

    setProductStock(prev => ({
      ...prev,
      [id]: prev[id] + stockDiff
    }));
  };

  const handleRemoveFromCart = (id: number) => {
    const item = cartItems.find(i => i.id === id);
    if (!item) return;

    setProductStock(prev => ({
      ...prev,
      [id]: prev[id] + item.quantity
    }));

    setCartItems(cartItems.filter(i => i.id !== id));
  };

  const handleCheckout = (selectedItems: number[]) => {
    const itemsToCheckout = cartItems.filter(item => selectedItems.includes(item.id));
    const total = itemsToCheckout.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    if (confirm(`确认支付 ¥${total}？`)) {
      alert('支付成功！');
      setCartItems(cartItems.filter(item => !selectedItems.includes(item.id)));
    }
  };

  const handleToggleFavorite = (itemId: number) => {
    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter(id => id !== itemId));
      alert('已取消收藏！');
    } else {
      setFavorites([...favorites, itemId]);
      alert('已添加到收藏！');
    }
  };

  const handleExchange = (item: SecondHandItem) => {
    setSelectedSecondHand(item);
    setShowExchangeForm(true);
  };

  const handleExchangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('交换申请已发送！等待物品主人回复。');
    setShowExchangeForm(false);
    setExchangeMessage('');
  };

  const handleNewItemSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('发布成功！审核通过后将显示在平台上');
    setShowNewItemForm(false);
    setNewItem({
      name: '',
      description: '',
      price: 0,
      category: '',
      condition: '',
      exchangeFor: '',
      images: []
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">大爱之为</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab('eco')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'eco'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            环保市场
          </button>
          <button
            onClick={() => setActiveTab('secondhand')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'secondhand'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            二手交换
          </button>
          <button
            onClick={() => setShowNewItemForm(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            {activeTab === 'eco' ? '发布环保商品' : '发布二手物品'}
          </button>
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            购物车
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 商品列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeTab === 'eco' ? (
          // 环保产品列表
          products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {
                setSelectedProduct(product);
                setShowModal(true);
              }}
            >
              <div className="h-48 bg-gray-100 rounded-lg mb-4 relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-green-600 font-bold">¥{product.price}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    库存: {productStock[product.id]}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product, 'eco');
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  disabled={productStock[product.id] === 0}
                >
                  {productStock[product.id] === 0 ? '已售罄' : '购买'}
                </button>
              </div>
            </div>
          ))
        ) : (
          // 二手物品列表
          secondHandItems.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gray-100 rounded-lg mb-4 relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{item.name}</h3>
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                  {item.condition}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <p className="text-sm text-gray-500 mb-3">
                位置: {item.location} | 卖家: {item.owner}
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-green-600 font-bold">¥{item.price}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    库存: {productStock[item.id]}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleExchange(item)}
                    className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 text-sm"
                  >
                    交换
                  </button>
                  <button
                    onClick={() => handleToggleFavorite(item.id)}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      favorites.includes(item.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {favorites.includes(item.id) ? '已收藏' : '收藏'}
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-500">可交换物品：</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {item.exchangeFor.map((item, index) => (
                    <span
                      key={index}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 购物车组件 */}
      <ShoppingCart
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
        isOpen={showCart}
        onClose={() => setShowCart(false)}
      />

      {/* 商品详情模态框 */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{selectedProduct.name}</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64 bg-gray-100 rounded-lg relative overflow-hidden">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">商品详情</h4>
                  <p className="text-gray-600 whitespace-pre-line">{selectedProduct.details}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">环保影响</h4>
                  <p className="text-green-600">{selectedProduct.impact}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">库存</h4>
                  <p className="text-gray-600">{selectedProduct.stock} 件</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">
                    ¥{selectedProduct.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(selectedProduct, 'eco')}
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                  >
                    立即购买
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 交换申请表单 */}
      {showExchangeForm && selectedSecondHand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">申请交换</h3>
              <button
                onClick={() => setShowExchangeForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleExchangeSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  交换物品
                </label>
                <p className="text-gray-600">{selectedSecondHand.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  您想用什么物品交换？
                </label>
                <select
                  required
                  className="w-full p-2 border rounded-lg"
                  value={exchangeMessage}
                  onChange={(e) => setExchangeMessage(e.target.value)}
                >
                  <option value="">请选择物品类型</option>
                  {selectedSecondHand.exchangeFor.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  留言给物品主人
                </label>
                <textarea
                  required
                  className="w-full p-2 border rounded-lg"
                  rows={3}
                  placeholder="请描述您的物品情况，以及为什么想要交换..."
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowExchangeForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  提交申请
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 发布新物品表单 */}
      {showNewItemForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">
                {activeTab === 'eco' ? '发布环保商品' : '发布二手物品'}
              </h3>
              <button
                onClick={() => setShowNewItemForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleNewItemSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  商品名称
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-2 border rounded-lg"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  商品描述
                </label>
                <textarea
                  required
                  className="w-full p-2 border rounded-lg"
                  rows={3}
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    价格
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    className="w-full p-2 border rounded-lg"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {activeTab === 'eco' ? '分类' : '物品成色'}
                  </label>
                  {activeTab === 'eco' ? (
                    <select
                      required
                      className="w-full p-2 border rounded-lg"
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    >
                      <option value="">请选择分类</option>
                      <option value="清洁能源">清洁能源</option>
                      <option value="日常用品">日常用品</option>
                      <option value="节水产品">节水产品</option>
                      <option value="智能家居">智能家居</option>
                      <option value="绿色生活">绿色生活</option>
                    </select>
                  ) : (
                    <select
                      required
                      className="w-full p-2 border rounded-lg"
                      value={newItem.condition}
                      onChange={(e) => setNewItem({ ...newItem, condition: e.target.value })}
                    >
                      <option value="">请选择成色</option>
                      <option value="全新">全新</option>
                      <option value="95新">95新</option>
                      <option value="9成新">9��新</option>
                      <option value="8成新">8成新</option>
                      <option value="7成新">7成新</option>
                    </select>
                  )}
                </div>
              </div>
              {activeTab === 'secondhand' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    期望交换物品（用逗号分隔）
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="例如：手机,平板,笔记本"
                    value={newItem.exchangeFor}
                    onChange={(e) => setNewItem({ ...newItem, exchangeFor: e.target.value })}
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  上传图片
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="w-full p-2 border rounded-lg"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setNewItem({ ...newItem, images: files });
                  }}
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowNewItemForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  发布
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoveActions; 