import React, { useState } from 'react';
import { useAdminCourses } from '../../hooks/useSupabaseData';
import { supabase } from '../../lib/supabase';
import { Course } from '../../types';

const AdminCourses: React.FC = () => {
  const { courses, loading, refresh } = useAdminCourses();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({ title: '', slug: '', description: '', cover_image: '', instructor_name: '', price: 0, original_price: 0, level: 'beginner', is_published: true, is_featured: false, category_id: '' });

  const filteredCourses = courses.filter(c => !c.parent_id && c.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const openEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({ title: course.title, slug: course.slug, description: course.description || '', cover_image: course.cover_image || '', instructor_name: course.instructor_name || '', price: course.price || 0, original_price: course.original_price || 0, level: course.level || 'beginner', is_published: course.is_published || false, is_featured: course.is_featured || false, category_id: course.category_id || '' });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanData = { ...formData, category_id: formData.category_id || null, cover_image: formData.cover_image || null, instructor_name: formData.instructor_name || null, description: formData.description || null, original_price: formData.original_price || null };
    if (editingCourse) {
      const { error } = await supabase.from('courses').update(cleanData).eq('id', editingCourse.id);
      if (error) { alert('更新失败: ' + error.message); return; }
    } else {
      const { error } = await supabase.from('courses').insert(cleanData);
      if (error) { alert('添加失败: ' + error.message); return; }
    }
    setShowModal(false);
    setEditingCourse(null);
    refresh();
  };

  const togglePublish = async (id: string, val: boolean | null) => { await supabase.from('courses').update({ is_published: !val }).eq('id', id); refresh(); };
  const handleDelete = async (id: string) => { if (confirm('确定删除此课程？')) { await supabase.from('courses').delete().eq('id', id); refresh(); } };

  if (loading) return <div className="p-6">加载中...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">课程管理</h1>
        <button onClick={() => { setEditingCourse(null); setFormData({ title: '', slug: '', description: '', cover_image: '', instructor_name: '', price: 0, original_price: 0, level: 'beginner', is_published: true, is_featured: false, category_id: '' }); setShowModal(true); }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">添加课程</button>
      </div>
      <input type="text" placeholder="搜索课程..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500" />
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-sm font-medium text-gray-600">课程</th><th className="px-6 py-3 text-left text-sm font-medium text-gray-600">讲师</th><th className="px-6 py-3 text-left text-sm font-medium text-gray-600">价格</th><th className="px-6 py-3 text-left text-sm font-medium text-gray-600">状态</th><th className="px-6 py-3 text-left text-sm font-medium text-gray-600">操作</th></tr></thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCourses.map(course => (
              <tr key={course.id} className="hover:bg-gray-50">
                <td className="px-6 py-4"><div className="flex items-center"><img src={course.cover_image || 'https://images.unsplash.com/photo-1635075647320-4a6590e8f527?w=64&h=48&fit=crop'} alt={course.title} className="w-16 h-12 object-cover rounded" /><div className="ml-4"><div className="text-sm font-medium text-gray-900">{course.title}</div></div></div></td>
                <td className="px-6 py-4 text-sm text-gray-500">{course.instructor_name || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">¥{course.price || 0}</td>
                <td className="px-6 py-4"><button onClick={() => togglePublish(course.id, course.is_published)} className={`px-3 py-1 rounded-full text-sm ${course.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{course.is_published ? '已发布' : '草稿'}</button></td>
                <td className="px-6 py-4"><div className="flex gap-2"><button onClick={() => openEdit(course)} className="text-blue-600 hover:text-blue-800">编辑</button><button onClick={() => handleDelete(course.id)} className="text-red-600 hover:text-red-800">删除</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredCourses.length === 0 && <div className="text-center py-8 text-gray-500">暂无课程数据，请添加课程</div>}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editingCourse ? '编辑课程' : '添加课程'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">课程名称</label><input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') })} className="w-full px-3 py-2 border rounded-lg" required /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Slug</label><input type="text" value={formData.slug} onChange={e => setFormData({ ...formData, slug: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">描述</label><textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" rows={3} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">封面图URL</label><input type="url" value={formData.cover_image} onChange={e => setFormData({ ...formData, cover_image: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">讲师</label><input type="text" value={formData.instructor_name} onChange={e => setFormData({ ...formData, instructor_name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">价格</label><input type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" min="0" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">原价</label><input type="number" value={formData.original_price} onChange={e => setFormData({ ...formData, original_price: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-lg" min="0" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">难度</label><select value={formData.level} onChange={e => setFormData({ ...formData, level: e.target.value })} className="w-full px-3 py-2 border rounded-lg"><option value="beginner">入门</option><option value="intermediate">进阶</option><option value="advanced">高级</option></select></div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_published} onChange={e => setFormData({ ...formData, is_published: e.target.checked })} className="rounded" /><span className="text-sm">发布</span></label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({ ...formData, is_featured: e.target.checked })} className="rounded" /><span className="text-sm">精选</span></label>
              </div>
              <div className="flex gap-3 pt-4"><button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">取消</button><button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">保存</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCourses;
