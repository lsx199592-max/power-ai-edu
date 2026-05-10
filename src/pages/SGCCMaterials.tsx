import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { mockSGCCMaterials } from '../data/mockData';

const categories = ['全部', '技术规范', '培训教材', '技术指南', '安全规程', '案例集'];

const formatFileSize = (bytes: number) => {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(1)} KB`;
};

const SGCCMaterials: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMaterials = useMemo(() => {
    return mockSGCCMaterials.filter(material => {
      const matchCategory = selectedCategory === '全部' || material.category === selectedCategory;
      const matchSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        material.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">国家电网培训资料</h1>
          <p className="text-gray-600 text-sm md:text-base">专业电力技术资料，助力职业发展</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="搜索资料..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredMaterials.map((material, index) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-32 bg-gray-200 relative">
                <img
                  src={material.cover_image}
                  alt={material.title}
                  className="w-full h-full object-cover"
                />
                {material.is_featured && (
                  <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded">
                    推荐
                  </span>
                )}
                {material.is_free && (
                  <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                    免费
                  </span>
                )}
              </div>
              <div className="p-4">
                <span className="text-xs text-blue-600 font-medium">{material.category}</span>
                <h3 className="font-semibold text-gray-900 mt-1 line-clamp-2 text-sm md:text-base">{material.title}</h3>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">{material.description}</p>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                  <span>{formatFileSize(material.file_size)}</span>
                  <span>{material.download_count} 次下载</span>
                </div>
                <button className="w-full mt-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  {material.is_free ? '立即下载' : '会员免费下载'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            暂无相关资料
          </div>
        )}
      </div>
    </div>
  );
};

export default SGCCMaterials;