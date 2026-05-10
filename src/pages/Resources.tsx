import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Download, FileText, File, FileArchive, TrendingUp, Briefcase, Wrench, Cpu, Lock } from 'lucide-react';
import { mockResources, mockResourceCategories } from '../data/mockData';
import { Resource, ResourceCategory } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  'file-text': <FileText className="w-5 h-5" />,
  'clipboard': <File className="w-5 h-5" />,
  'briefcase': <Briefcase className="w-5 h-5" />,
  'tool': <Wrench className="w-5 h-5" />,
  'trending-up': <TrendingUp className="w-5 h-5" />,
  'cpu': <Cpu className="w-5 h-5" />,
};

const fileTypeIcons: Record<string, React.ReactNode> = {
  'pdf': <FileText className="w-4 h-4 text-red-500" />,
  'zip': <FileArchive className="w-4 h-4 text-yellow-500" />,
  'default': <File className="w-4 h-4 text-gray-500" />,
};

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
};

const Resources: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '');
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') || '');
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [categories] = useState<ResourceCategory[]>(mockResourceCategories);

  useEffect(() => {
    let filtered = [...mockResources];
    if (selectedCategory) {
      filtered = filtered.filter(r => r.category_id === selectedCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(query) ||
        r.description?.toLowerCase().includes(query)
      );
    }
    setResources(filtered);
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set('category', categoryId);
    } else {
      params.delete('category');
    }
    setSearchParams(params);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">资源库</h1>
          <p className="text-sm sm:text-base text-slate-400">电力 AI 领域专业资源，助力您的学习与成长</p>
        </div>

        <form onSubmit={handleSearch} className="mb-4 sm:mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索资源..."
              className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-slate-400"
            />
          </div>
        </form>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-slate-800 rounded-lg p-3 sm:p-4 lg:sticky lg:top-4">
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-slate-300">资源分类</h3>
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                <button
                  onClick={() => handleCategoryChange('')}
                  className={`whitespace-nowrap lg:w-full lg:text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                    !selectedCategory ? 'bg-blue-600 text-white' : 'hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  全部资源
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`whitespace-nowrap lg:w-full lg:text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${
                      selectedCategory === category.id ? 'bg-blue-600 text-white' : 'hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {iconMap[category.icon || ''] || <File className="w-4 h-4 sm:w-5 sm:h-5" />}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-slate-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
                >
                  <div className="h-24 sm:h-32 bg-slate-700 relative">
                    {resource.cover_image ? (
                      <img src={resource.cover_image} alt={resource.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileArchive className="w-10 h-10 sm:w-12 sm:h-12 text-slate-500" />
                      </div>
                    )}
                    {resource.is_free && (
                      <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">免费</span>
                    )}
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2 line-clamp-1">{resource.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 mb-2 sm:mb-3 line-clamp-2">{resource.description}</p>
                    <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-500 mb-2 sm:mb-3">
                      <span className="flex items-center gap-1">
                        {fileTypeIcons[resource.file_type || 'default']}
                        {resource.file_type?.toUpperCase()}
                      </span>
                      <span>{formatFileSize(resource.file_size || 0)}</span>
                      <span className="flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        {resource.download_count}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      {resource.is_free ? (
                        <span className="text-sm text-green-400 font-semibold">免费下载</span>
                      ) : (
                        <span className="text-sm text-orange-400 font-semibold">¥{resource.price}</span>
                      )}
                      <button className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                        {resource.is_free ? (
                          <>
                            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                            下载
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                            购买
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {resources.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                暂无相关资源
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;