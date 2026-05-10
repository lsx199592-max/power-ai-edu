import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Check, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { membershipPlans } from '../data/mockData';

const Membership: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    { q: '会员可以退款吗？', a: '购买后7天内可申请全额退款，请联系客服处理。' },
    { q: '会员权益何时生效？', a: '支付成功后立即生效，可马上享受所有会员权益。' },
    { q: '如何升级会员？', a: '在会员中心点击升级，补差价即可升级到更高级别。' },
    { q: '会员到期后会自动续费吗？', a: '不会自动续费，到期前会有提醒，需手动续费。' },
    { q: '如何购买会员？', a: '点击"立即开通"按钮，通过咸鱼链接完成购买，联系客服激活会员权益。' },
  ];

  const handlePurchase = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 py-8 sm:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">会员中心</h1>
          <p className="text-sm sm:text-lg text-slate-300">解锁全部课程资源，开启学习之旅</p>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">通过咸鱼购买会员，享受超值优惠</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 mb-12 sm:mb-16">
          {membershipPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-4 sm:p-8 ${
                plan.highlight
                  ? 'bg-gradient-to-br from-blue-600 to-purple-600 ring-2 sm:ring-4 ring-blue-400'
                  : 'bg-slate-800'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold">
                  最受欢迎
                </div>
              )}

              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <Crown className={plan.highlight ? 'text-yellow-400' : 'text-slate-400'} size={24} />
                <h3 className="text-xl sm:text-2xl font-bold text-white">{plan.name}</h3>
              </div>

              <div className="mb-4 sm:mb-6">
                <span className="text-3xl sm:text-5xl font-bold text-white">¥{plan.price}</span>
                <span className="text-sm sm:text-base text-slate-300 line-through ml-2">¥{plan.originalPrice}</span>
                <span className="text-xs sm:text-sm text-slate-400 ml-2">/{plan.duration}</span>
              </div>

              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-base text-slate-200">
                    <Check className="text-green-400 flex-shrink-0" size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePurchase(plan.link)}
                className={`w-full py-2 sm:py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 text-sm sm:text-base ${
                  plan.highlight
                    ? 'bg-white text-blue-600 hover:bg-slate-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                立即开通
                <ExternalLink size={16} />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800 rounded-2xl p-4 sm:p-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">常见问题</h2>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-700 last:border-0">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full py-3 sm:py-4 flex items-center justify-between text-left"
                >
                  <span className="text-sm sm:text-base text-white font-medium">{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp className="text-slate-400" size={18} />
                  ) : (
                    <ChevronDown className="text-slate-400" size={18} />
                  )}
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="pb-3 sm:pb-4 text-xs sm:text-base text-slate-300"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Membership;