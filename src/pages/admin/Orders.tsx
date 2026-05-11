import React, { useState } from 'react';
import { useAdminOrders } from '../../hooks/useSupabaseData';

const statusMap: Record<string, { label: string; color: string }> = {
  paid: { label: '已支付', color: 'bg-green-100 text-green-800' },
  pending: { label: '待支付', color: 'bg-yellow-100 text-yellow-800' },
  cancelled: { label: '已取消', color: 'bg-gray-100 text-gray-800' },
  refunded: { label: '已退款', color: 'bg-red-100 text-red-800' },
};

const typeMap: Record<string, string> = { course: '课程购买', resource: '资源下载', membership: '会员充值' };

const AdminOrders: React.FC = () => {
  const { orders, loading } = useAdminOrders();
  const [filter, setFilter] = useState<string>('all');
  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.status === filter);
  const totalRevenue = orders.filter(o => o.status === 'paid').reduce((a, b) => a + b.amount, 0);

  if (loading) return <div className="p-6">加载中...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">订单管理</h1>
        <div className="flex gap-2">{['all', 'paid', 'pending', 'cancelled'].map(s => (<button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{s === 'all' ? '全部' : (statusMap[s]?.label || s)}</button>))}</div>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">订单号</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">类型</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">商品</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">金额</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">时间</th></tr></thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-blue-600">{order.order_no}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{typeMap[order.item_type || ''] || order.item_type}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{order.item_name}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">¥{order.amount}</td>
                <td className="px-6 py-4"><span className={`px-2 py-1 text-xs font-medium rounded-full ${statusMap[order.status || 'pending']?.color || ''}`}>{statusMap[order.status || 'pending']?.label || order.status}</span></td>
                <td className="px-6 py-4 text-sm text-gray-500">{order.created_at ? new Date(order.created_at).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center text-sm text-gray-500"><span>共 {filteredOrders.length} 条订单</span><span>总收入: ¥{totalRevenue.toFixed(2)}</span></div>
    </div>
  );
};

export default AdminOrders;
