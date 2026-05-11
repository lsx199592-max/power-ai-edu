import React, { useState, useEffect } from 'react';
import { useAllAdvertisements } from '../../hooks/useSupabaseData';
import { supabase } from '../../lib/supabase';

const positions = [
  { value: 'home_top', label: '首页顶部' },
  { value: 'home_sidebar', label: '首页侧边栏' },
  { value: 'course_detail', label: '课程详情页' },
  { value: 'resource_list', label: '资源页' },
];

const Ads: React.FC = () => {
  const { ads, loading, refresh } = useAllAdvertisements();
  const [showModal, setShowModal] = useState(false);
  const [editingAd, setEditingAd] = useState<any>(null);
  const [formData, setFormData] = useState({ title: '', description: '', image_url: '', link_url: '', position: 'home_top', is_active: true, priority: 1 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanData = { ...formData, link_url: formData.link_url || null };
    if (editingAd) {
      const { error } = await supabase.from('advertisements').update(cleanData).eq('id', editingAd.id);
      if (error) { alert('更新失败: ' + error.message); return; }
    } else {
      const { error } = await supabase.from('advertisements').insert(cleanData);
      if (error) { alert('添加失败: ' + error.message); return; }
    }
    closeModal();
    refresh();
  };

  const handleEdit = (ad: any) => { setEditingAd(ad); setFormData(ad); setShowModal(true); };

  const handleDelete = async (id: string) => {
    if (confirm('确定删除此广告？')) { await supabase.from('advertisements').delete().eq('id', id); refresh(); }
  };

  const toggleStatus = async (ad: any) => {
    await supabase.from('advertisements').update({ is_active: !ad.is_active }).eq('id', ad.id);
    refresh();
  };

  const closeModal = () => { setShowModal(false); setEditingAd(null); setFormData({ title: '', description: '', image_url: '', link_url: '', position: 'home_top', is_active: true, priority: 1 }); };

  if (loading) return <div className="p-6">加载中...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6"><h1 className="text-2xl font-bold text-gray-800">广告管理</h1><button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">添加广告</button></div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50"><tr><th className="px-4 py-3 text-left text-sm font-medium text-gray-600">广告标题</th><th className="px-4 py-3 text-left text-sm font-medium text-gray-600">位置</th><th className="px-4 py-3 text-left text-sm font-medium text-gray-600">优先级</th><th className="px-4 py-3 text-left text-sm font-medium text-gray-600">状态</th><th className="px-4 py-3 text-left text-sm font-medium text-gray-600">操作</th></tr></thead>
          <tbody className="divide-y divide-gray-200">
            {ads.map(ad => (
              <tr key={ad.id} className="hover:bg-gray-50">
                <td className="px-4 py-3"><div className="flex items-center gap-3"><img src={ad.image_url} alt={ad.title} className="w-12 h-12 rounded object-cover" /><div><div className="font-medium text-gray-800">{ad.title}</div><div className="text-sm text-gray-500">{ad.description}</div></div></div></td>
                <td className="px-4 py-3 text-gray-600">{positions.find(p => p.value === ad.position)?.label || ad.position}</td>
                <td className="px-4 py-3 text-gray-600">{ad.priority}</td>
                <td className="px-4 py-3"><button onClick={() => toggleStatus(ad)} className={`px-3 py-1 rounded-full text-sm ${ad.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{ad.is_active ? '已启用' : '已禁用'}</button></td>
                <td className="px-4 py-3"><div className="flex gap-2"><button onClick={() => handleEdit(ad)} className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded">编辑</button><button onClick={() => handleDelete(ad.id)} className="px-3 py-1 text-red-600 hover:bg-red-50 rounded">删除</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">{editingAd ? '编辑广告' : '添加广告'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">广告标题</label><input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">描述</label><input type="text" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">图片URL</label><input type="url" value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">链接地址</label><input type="text" value={formData.link_url} onChange={e => setFormData({ ...formData, link_url: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">广告位置</label><select value={formData.position} onChange={e => setFormData({ ...formData, position: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">{positions.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">优先级</label><input type="number" value={formData.priority} onChange={e => setFormData({ ...formData, priority: parseInt(e.target.value) })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" min="1" /></div>
              <div className="flex items-center gap-2"><input type="checkbox" checked={formData.is_active} onChange={e => setFormData({ ...formData, is_active: e.target.checked })} className="rounded" /><label className="text-sm text-gray-700">启用广告</label></div>
              <div className="flex gap-3 pt-4"><button type="button" onClick={closeModal} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">取消</button><button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">保存</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ads;
