import React, { useState } from 'react';
import { motion } from 'framer-motion';

const mockOrders = [
  { id: 'ORD001', user: '张三', type: '课程购买', item: '电力巡检AI实战', amount: 299, status: 'paid', created_at: '2024-01-15 10:30:00' },
  { id: 'ORD002', user: '李四', type: '会员充值', item: '季卡会员', amount: 38.8, status: 'paid', created_at: '2024-01-15 09:20:00' },
  { id: 'ORD003', user: '王五', type: '资源下载', item: 'AI工程师认证真题集', amount: 99, status: 'pending', created_at: '2024-01-14 16:45:00' },
  { id: 'ORD004', user: '赵六', type: '课程购买', item: '智能电网调度系统开发', amount: 399, status: 'paid', created_at: '2024-01-14 14:20:00' },
  { id: 'ORD005', user: '钱七', type: '会员充值', item: '年卡会员', amount: 99.9, status: 'failed', created_at: '2024-01-13 11:00:00' },
];

const statusMap: Record<string, { label: string; color: string }> = {
  paid: { label: '已支付', color: 'bg-green-100 text-green-800' },
  pending: { label: '待支付', color: 'bg-yellow-100 text-yellow-800' },
  failed: { label: '支付失败', color: 'bg-red-100 text-red-800' },
};

const AdminOrders: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredOrders = filter === 'all' 
    ? mockOrders 
    : mockOrders.filter(o => o.status === filter);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">订单管理</h1>
        <div className="flex gap-2">
          {['all', 'paid', 'pending', 'failed'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s === 'all' ? '全部' : statusMap[s].label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">订单号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">用户</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">类型</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">商品</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">金额</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">时间</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredOrders.map((order, idx) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-sm font-medium text-blue-600">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{order.user}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.type}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{order.item}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">¥{order.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusMap[order.status].color}`}>
                    {statusMap[order.status].label}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{order.created_at}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span>共 {filteredOrders.length} 条订单</span>
        <span>总收入: ¥{mockOrders.filter(o => o.status === 'paid').reduce((a, b) => a + b.amount, 0).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default AdminOrders;