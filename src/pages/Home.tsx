import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Network, BarChart2, Award, Cpu, Play, Download, Users, ChevronRight } from 'lucide-react';
import { mockCourses, mockCategories, membershipPlans } from '../data/mockData';

const iconMap: Record<string, React.ReactNode> = {
  zap: <Zap className="w-8 h-8" />,
  network: <Network className="w-8 h-8" />,
  'bar-chart-2': <BarChart2 className="w-8 h-8" />,
  award: <Award className="w-8 h-8" />,
  cpu: <Cpu className="w-8 h-8" />,
};

const Home: React.FC = () => {
  const featuredCourses = mockCourses.filter(c => c.is_featured).slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-12 sm:py-16 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCAyLTRzLTItMi0yLTQgMi00IDItNCAyIDIgMiA0LTIgNC0yIDQgMiAyIDIgNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm">专注电力行业 AI 人才培养</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
              电力 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">AI</span> 学院
            </h1>
            <p className="text-base sm:text-xl text-slate-300 mb-6 sm:mb-8">
              从电力巡检到智能调度，掌握前沿 AI 技术，开启职业新篇章
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all transform hover:scale-105"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                开始学习
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg border border-white/20 transition-all"
              >
                查看课程
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-8 sm:py-16 bg-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-4">精选课程</h2>
            <p className="text-sm sm:text-base text-slate-400">行业专家精心打造，实战导向</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/courses/${course.slug}`} className="block group">
                  <div className="bg-slate-700/50 rounded-xl overflow-hidden border border-slate-600 hover:border-blue-500 transition-all">
                    <div className="aspect-video bg-slate-600 overflow-hidden">
                      <img src={course.cover_image!} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">{course.title}</h3>
                      <p className="text-slate-400 text-sm mb-3 line-clamp-2">{course.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-yellow-400">
                          <span className="text-sm">★</span>
                          <span className="text-sm text-white">{course.rating}</span>
                        </div>
                        <div className="text-blue-400 font-semibold">¥{course.price}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 sm:py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-4">课程分类</h2>
            <p className="text-sm sm:text-base text-slate-400">覆盖电力 AI 全领域</p>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {mockCategories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/courses?category=${cat.slug}`} className="block">
                  <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 sm:p-6 text-center hover:border-blue-500 hover:bg-slate-700 transition-all group">
                    <div className="text-blue-400 mb-2 sm:mb-3 flex justify-center">{iconMap[cat.icon || 'zap']}</div>
                    <h3 className="text-sm sm:text-base text-white font-medium group-hover:text-blue-400 transition-colors">{cat.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources & Membership */}
      <section className="py-8 sm:py-16 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 rounded-2xl p-6 sm:p-8 border border-cyan-500/20"
            >
              <Download className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-400 mb-3 sm:mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">资源库</h3>
              <p className="text-sm sm:text-base text-slate-300 mb-4 sm:mb-6">课件、真题、案例、工具包、行业报告、AI 模型教程</p>
              <Link to="/resources" className="inline-flex items-center gap-2 text-sm sm:text-base text-cyan-400 hover:text-cyan-300 font-medium">
                浏览资源 <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Membership */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-2xl p-6 sm:p-8 border border-purple-500/20"
            >
              <Award className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400 mb-3 sm:mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">会员权益</h3>
              <p className="text-sm sm:text-base text-slate-300 mb-4 sm:mb-6">VIP 会员 ¥{membershipPlans[0].price}/月，高级会员 ¥{membershipPlans[1].price}/季</p>
              <Link to="/membership" className="inline-flex items-center gap-2 text-sm sm:text-base text-purple-400 hover:text-purple-300 font-medium">
                查看详情 <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enterprise Training */}
      <section className="py-8 sm:py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 sm:p-8 md:p-12 text-center"
          >
            <Users className="w-10 h-10 sm:w-12 sm:h-12 text-white/80 mx-auto mb-3 sm:mb-4" />
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">企业团训定制</h3>
            <p className="text-sm sm:text-base text-white/80 mb-4 sm:mb-6 max-w-2xl mx-auto">为电力企业提供定制化 AI 培训方案，助力团队数字化转型</p>
            <Link to="/enterprise" className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base">
              立即咨询 <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;