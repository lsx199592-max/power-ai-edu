import React, { useState } from 'react';
import { useAdminResources, useResourceCategories } from '../../hooks/useSupabaseData';
import { supabase } from '../../lib/supabase';

const AdminResources: React.FC = () => {
  const { resources, loading, refresh } = useAdminResources();
  const { resourceCategories } = useResourceCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || resource.category_id === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string) => { if (confirm('确定要删除这个资源吗？')) { await supabase.from('resources').delete().eq('id', id); refresh(); } };
  const handleTogglePublish = async (id: string, val: boolean | null) => { await supabase.from('resources').update({ is_published: !val }).eq('id', id); refresh(); };
  const getCategoryName = (categoryId: string | null) => { if (!categoryId) return '未分类'; return resourceCategories.find(c => c.id === categoryId)?.name || '未分类'; };
  const formatFileSize = (bytes: number | null) => { if (!bytes) return '0 KB'; if (bytes >= 1073741824) return (bytes / 1073741824).toFixed(2) + ' GB'; if (bytes >= 1048576) return (bytes / 1048576).toFixed(2) + ' MB'; return (bytes / 1024).toFixed(2) + ' KB'; };

  if (loading) return <div className="p-6">加载中...</div>;

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4"><h1 className="text-2xl font-bold text-gray-800">资源管理</h1><button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">添加资源</button></div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input type="text" placeholder="搜索资源..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"><option value="all">全部分类</option>{resourceCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">资源名称</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">分类</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">大小</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">价格</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">下载量</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th></tr></thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResources.map(resource => (
                <tr key={resource.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4"><div className="flex items-center"><div className="w-10 h-10 flex-shrink-0 bg-gray-100 rounded flex items-center justify-center"><span className="text-xs text-gray-500 uppercase">{resource.file_type}</span></div><div className="ml-4"><div className="text-sm font-medium text-gray-900">{resource.title}</div><div className="text-sm text-gray-500 truncate max-w-xs">{resource.description}</div></div></div></td>
                  <td className="px-6 py-4 text-sm text-gray-500">{getCategoryName(resource.category_id)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatFileSize(resource.file_size)}</td>
                  <td className="px-6 py-4"><span className={`text-sm ${resource.is_free ? 'text-green-600' : 'text-orange-600'}`}>{resource.is_free ? '免费' : `¥${resource.price}`}</span></td>
                  <td className="px-6 py-4 text-sm text-gray-500">{resource.download_count}</td>
                  <td className="px-6 py-4 text-sm"><button onClick={() => handleTogglePublish(resource.id, resource.is_published)} className="text-blue-600 hover:text-blue-800 mr-3">{resource.is_published ? '下架' : '上架'}</button><button onClick={() => handleDelete(resource.id)} className="text-red-600 hover:text-red-800">删除</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredResources.length === 0 && <div className="text-center py-8 text-gray-500">暂无数据</div>}
      </div>
    </div>
  );
};

export default AdminResources;
