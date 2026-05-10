import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Clock, BarChart3, CheckCircle } from 'lucide-react';

const Enterprise: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    requirements: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const advantages = [
    { icon: BookOpen, title: '定制课程', desc: '根据企业需求量身定制培训内容' },
    { icon: Users, title: '专属讲师', desc: '行业专家一对一指导教学' },
    { icon: Clock, title: '灵活时间', desc: '根据企业安排灵活调整培训时间' },
    { icon: BarChart3, title: '效果评估', desc: '完整的学习效果跟踪与评估报告' },
  ];

  const cases = [
    { name: '国家电网', project: '电力巡检 AI 培训', employees: 120, result: '效率提升 40%' },
    { name: '南方电网', project: '智能调度系统培训', employees: 85, result: '故障率降低 35%' },
    { name: '华能集团', project: '数据分析能力提升', employees: 200, result: '决策效率提升 50%' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-white mb-4">企业团训服务</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            为电力企业提供专业的 AI 技术培训解决方案，助力企业数字化转型
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {advantages.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 text-center hover:border-blue-500 transition-colors"
            >
              <item.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8 mb-16"
        >
          <h2 className="text-2xl font-bold text-white mb-6">合作案例</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {cases.map((item, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-8 h-8 text-blue-400" />
                  <h3 className="text-white font-semibold">{item.name}</h3>
                </div>
                <p className="text-slate-400 text-sm mb-2">项目：{item.project}</p>
                <p className="text-slate-400 text-sm mb-2">培训人数：{item.employees} 人</p>
                <p className="text-green-400 text-sm font-medium">{item.result}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">联系我们</h2>
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <p className="text-white text-lg">提交成功！我们会尽快与您联系</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm mb-2">公司名称 *</label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  placeholder="请输入公司名称"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 text-sm mb-2">联系人 *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="请输入联系人姓名"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm mb-2">联系电话 *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="请输入联系电话"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-2">邮箱</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                  placeholder="请输入邮箱地址"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-sm mb-2">培训需求 *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none resize-none"
                  placeholder="请描述您的培训需求"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                提交咨询
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

function BookOpen({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

export default Enterprise;