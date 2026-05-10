import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Users, Award, Mail, Phone, MapPin } from 'lucide-react';

const About: React.FC = () => {
  const milestones = [
    { year: '2020', event: '平台成立，专注电力 AI 教育' },
    { year: '2021', event: '用户突破 1 万，推出会员体系' },
    { year: '2022', event: '与 10+ 电力企业达成合作' },
    { year: '2023', event: '上线 AI 答疑功能，用户超 5 万' },
    { year: '2024', event: '成为电力行业 AI 教育领先平台' },
  ];

  const team = [
    { name: '张明博士', role: '创始人 & CEO', desc: '电力 AI 领域专家' },
    { name: '李华教授', role: '首席技术官', desc: '智能电网研究专家' },
    { name: '王强老师', role: '教学总监', desc: '10年教学经验' },
  ];

  const partners = ['国家电网', '南方电网', '华能集团', '大唐集团', '国家能源集团'];

  return (
    <div className="min-h-screen bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Zap className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">关于我们</h1>
          <p className="text-xl text-slate-400">专注电力行业 AI 人才培养</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800 rounded-xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Target className="text-blue-500" />
            平台介绍
          </h2>
          <p className="text-slate-300 leading-relaxed">
            我们是国内领先的电力 AI 在线教育平台，致力于为电力行业从业者、AI 技术学习者提供专业、实用的技能培训。
            平台汇聚行业顶尖讲师，课程涵盖电力巡检 AI、电网调度 AI、电力数据分析等前沿领域，已帮助数万名学员实现职业转型与技能提升。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800 rounded-xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Award className="text-blue-500" />
            发展历程
          </h2>
          <div className="space-y-4">
            {milestones.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="text-blue-500 font-bold w-16">{item.year}</span>
                <span className="text-slate-300">{item.event}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800 rounded-xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Users className="text-blue-500" />
            核心团队
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-slate-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-500">{member.name[0]}</span>
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-blue-500 text-sm mb-2">{member.role}</p>
                <p className="text-slate-400 text-sm">{member.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800 rounded-xl p-8 mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">合作伙伴</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {partners.map((partner, index) => (
              <div key={index} className="bg-slate-700 px-6 py-3 rounded-lg text-slate-300">
                {partner}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-slate-800 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6">联系我们</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-500" />
              <span className="text-slate-300">contact@powerai.edu</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-blue-500" />
              <span className="text-slate-300">400-888-9999</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-blue-500" />
              <span className="text-slate-300">北京市海淀区</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;