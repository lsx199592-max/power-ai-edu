import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MessageCircle, Mail, Phone } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: string;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    id: 'account',
    name: '账户问题',
    icon: 'user',
    items: [
      { question: '如何注册账号？', answer: '点击右上角"注册"按钮，填写用户名、邮箱和密码即可完成注册。' },
      { question: '忘记密码怎么办？', answer: '在登录页面点击"忘记密码"，输入注册邮箱即可重置密码。' },
      { question: '如何修改个人信息？', answer: '登录后进入"个人中心"，点击"编辑资料"即可修改。' },
    ],
  },
  {
    id: 'course',
    name: '课程问题',
    icon: 'book',
    items: [
      { question: '购买的课程可以永久观看吗？', answer: '是的，购买的课程永久有效，可随时回看。' },
      { question: '课程支持下载吗？', answer: 'VIP及以上会员支持离线下载课程视频。' },
      { question: '如何获取课程证书？', answer: '完成课程学习并通过考核后，系统自动颁发电子证书。' },
    ],
  },
  {
    id: 'payment',
    name: '支付问题',
    icon: 'credit-card',
    items: [
      { question: '支持哪些支付方式？', answer: '支持支付宝、微信支付、PayPal、信用卡等多种方式。' },
      { question: '如何申请退款？', answer: '购买后7天内未学习超过30%可申请全额退款，联系客服处理。' },
      { question: '发票如何开具？', answer: '在订单详情页申请电子发票，1-3个工作日内发送至邮箱。' },
    ],
  },
  {
    id: 'download',
    name: '资源下载',
    icon: 'download',
    items: [
      { question: '资源下载次数有限制吗？', answer: '普通用户每个资源限下载3次，VIP会员无限次下载。' },
      { question: '下载的资源可以分享吗？', answer: '资源仅供个人学习使用，禁止传播和商用。' },
      { question: '下载失败怎么办？', answer: '请检查网络连接，或更换浏览器重试，仍失败请联系客服。' },
    ],
  },
];

const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('account');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    );
  };

  const filteredItems = faqCategories
    .find(cat => cat.id === activeCategory)
    ?.items.filter(
      item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">帮助中心</h1>
          <p className="text-slate-600">常见问题解答，快速解决您的疑问</p>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="搜索问题..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
          />
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {faqCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <AnimatePresence mode="wait">
            {filteredItems.map((item, index) => {
              const itemId = `${activeCategory}-${index}`;
              const isExpanded = expandedItems.includes(itemId);

              return (
                <motion.div
                  key={itemId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-b border-slate-100 last:border-0"
                >
                  <button
                    onClick={() => toggleItem(itemId)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition"
                  >
                    <span className="font-medium text-slate-900">{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-4 text-slate-600">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-xl font-bold mb-2">没有找到答案？</h2>
          <p className="text-blue-100 mb-6">联系我们的客服团队，我们将竭诚为您服务</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="#"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
            >
              <MessageCircle className="w-5 h-5" />
              在线客服
            </a>
            <a
              href="mailto:support@powerai.com"
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
            >
              <Mail className="w-5 h-5" />
              发送邮件
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;