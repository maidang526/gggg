'use client';

import React, { useState } from 'react';

const CarbonFootprint = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transport' | 'food'>('overview');

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">碳足迹追踪</h2>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'overview'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            总览
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'transport'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setActiveTab('transport')}
          >
            交通
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'food'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setActiveTab('food')}
          >
            饮食
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">本月碳排放</p>
              <p className="text-2xl font-bold text-green-600">2.5吨</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">较上月变化</p>
              <p className="text-2xl font-bold text-blue-600">-12%</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">年度目标完成度</p>
              <p className="text-2xl font-bold text-purple-600">68%</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">排放来源分析</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-32">交通出行</div>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '45%' }}></div>
                </div>
                <div className="w-20 text-right">45%</div>
              </div>
              <div className="flex items-center">
                <div className="w-32">生活用电</div>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '30%' }}></div>
                </div>
                <div className="w-20 text-right">30%</div>
              </div>
              <div className="flex items-center">
                <div className="w-32">饮食消费</div>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: '25%' }}></div>
                </div>
                <div className="w-20 text-right">25%</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">您的减排为地球带来的改变</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🌳</span>
                  <div>
                    <h4 className="font-medium text-gray-900">植树造林</h4>
                    <p className="text-sm text-gray-600">
                      您的减排量相当于种植了3棵树，它们将在未来50年内持续吸收二氧化碳
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🐋</span>
                  <div>
                    <h4 className="font-medium text-gray-900">海洋保护</h4>
                    <p className="text-sm text-gray-600">
                      减少的碳排放可以减缓海洋酸化，相当于保护了100平方米的珊瑚礁
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">🦁</span>
                  <div>
                    <h4 className="font-medium text-gray-900">生物多样性</h4>
                    <p className="text-sm text-gray-600">
                      您的环保行为帮助保护了濒危物种的栖息地，为地球生态系统作出贡献
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">❄️</span>
                  <div>
                    <h4 className="font-medium text-gray-900">冰川保护</h4>
                    <p className="text-sm text-gray-600">
                      您的减排行为相当于防止了约0.5平方米的北极冰川融化
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transport' && (
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <span className="text-2xl">🚗</span>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-medium">私家车</span>
                <span className="text-gray-600">76.95 kg CO₂</span>
              </div>
              <div className="text-sm text-gray-500">450 公里/月</div>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <span className="text-2xl">🚌</span>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-medium">公交车</span>
                <span className="text-gray-600">13.6 kg CO₂</span>
              </div>
              <div className="text-sm text-gray-500">200 公里/月</div>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <span className="text-2xl">🚇</span>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-medium">地铁</span>
                <span className="text-gray-600">12.3 kg CO₂</span>
              </div>
              <div className="text-sm text-gray-500">300 公里/月</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'food' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <span className="text-2xl">🥩</span>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-medium">牛肉</span>
                <span className="text-gray-600">54 kg CO₂</span>
              </div>
              <div className="text-sm text-gray-500">2 kg/月</div>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <span className="text-2xl">🥓</span>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-medium">猪肉</span>
                <span className="text-gray-600">36.3 kg CO₂</span>
              </div>
              <div className="text-sm text-gray-500">3 kg/月</div>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <span className="text-2xl">🍗</span>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-medium">鸡肉</span>
                <span className="text-gray-600">27.6 kg CO₂</span>
              </div>
              <div className="text-sm text-gray-500">4 kg/月</div>
            </div>
          </div>
          <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
            <span className="text-2xl">🥬</span>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-medium">蔬菜</span>
                <span className="text-gray-600">30 kg CO₂</span>
              </div>
              <div className="text-sm text-gray-500">15 kg/月</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarbonFootprint;
