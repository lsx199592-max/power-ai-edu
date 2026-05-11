import React, { useState } from 'react';
import { useAdminUsers } from '../../hooks/useSupabaseData';
import { supabase } from '../../lib/supabase';

const AdminUsers: React.FC = () => {
  const { users, loading, refresh } = useAdminUsers();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.includes(searchTerm) || (user.email || '').includes(searchTerm);
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string | null) => {
    const styles: Record<string, string> = { admin: 'bg-red-100 text-red-700', premium: 'bg-purple-100 text-purple-700', vip: 'bg-yellow-100 text-yellow-700', user: 'bg-gray-100 text-gray-700' };
    const labels: Record<string, string> = { admin: '管理员', premium: '高级会员', vip: 'VIP会员', user: '普通用户' };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[role || 'user'] || styles.user}`}>{labels[role || 'user'] || role}</span>;
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
    refresh();
  };

  if (loading) return <div className="p-6">加载中...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">用户管理</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input type="text" placeholder="搜索用户名或邮箱..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"><option value="all">全部角色</option><option value="admin">管理员</option><option value="vip">VIP会员</option><option value="premium">高级会员</option><option value="user">普通用户</option></select>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">用户</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">角色</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">注册时间</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th></tr></thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} alt={user.username} className="w-10 h-10 rounded-full mr-3" /><div><div className="font-medium text-gray-900">{user.username}</div><div className="text-sm text-gray-500">{user.email}</div></div></div></td>
                  <td className="px-6 py-4 whitespace-nowrap">{getRoleBadge(user.role)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select value={user.role || 'user'} onChange={(e) => handleRoleChange(user.id, e.target.value)} className="px-2 py-1 border rounded text-sm"><option value="user">普通用户</option><option value="vip">VIP会员</option><option value="premium">高级会员</option><option value="admin">管理员</option></select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredUsers.length === 0 && <div className="text-center py-12 text-gray-500">暂无匹配的用户</div>}
      </div>
    </div>
  );
};

export default AdminUsers;
