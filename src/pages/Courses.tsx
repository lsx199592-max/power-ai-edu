import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Star, Users, Zap, ChevronDown, ChevronRight } from 'lucide-react';
import { mockCourses, mockCategories } from '../data/mockData';
import { Course, Category } from '../types';

const Courses: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  const handleCategoryClick = (slug: string) => {
    const newCategory = selectedCategory === slug ? '' : slug;
    setSelectedCategory(newCategory);
    if (newCategory) {
      setSearchParams({ category: newCategory });
    } else {
      setSearchParams({});
    }
  };

  const toggleExpand = (courseId: string) => {
    const newExpanded = new Set(expandedCourses);
    if (newExpanded.has(courseId)) {
      newExpanded.delete(courseId);
    } else {
      newExpanded.add(courseId);
    }
    setExpandedCourses(newExpanded);
  };

  const filteredCourses = mockCourses.filter(course => {
    const matchCategory = !selectedCategory || 
      mockCategories.find(c => c.id === course.category_id)?.slug === selectedCategory;
    const matchSearch = !searchQuery || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.description?.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch && !course.parent_id;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return (a.price || 0) - (b.price || 0);
      case 'price-high': return (b.price || 0) - (a.price || 0);
      case 'rating': return (b.rating || 0) - (a.rating || 0);
      default: return (b.students_count || 0) - (a.students_count || 0);
    }
  });

  return (
    <div className="min-h-screen bg-slate-900 pt-16 sm:pt-20">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">课程中心</h1>
          <p className="text-sm sm:text-base text-slate-400">探索电力 AI 领域精品课程，提升专业技能</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-slate-800 rounded-xl p-3 sm:p-4 lg:sticky lg:top-24">
              <h3 className="text-white font-semibold mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                <Zap className="w-4 h-4 text-yellow-400" />
                课程分类
              </h3>
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                <button
                  onClick={() => handleCategoryClick('')}
                  className={`whitespace-nowrap lg:w-full lg:text-left px-3 py-2 rounded-lg transition-all text-sm ${
                    !selectedCategory
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  全部课程
                </button>
                {mockCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.slug)}
                    className={`whitespace-nowrap lg:w-full lg:text-left px-3 py-2 rounded-lg transition-all text-sm ${
                      selectedCategory === category.slug
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-slate-800 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="搜索课程..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 text-sm bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 sm:px-4 py-2 text-sm bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="popular">最受欢迎</option>
                <option value="rating">评分最高</option>
                <option value="price-low">价格从低到高</option>
                <option value="price-high">价格从高到低</option>
              </select>
            </div>

            <div className="mb-3 sm:mb-4 text-sm text-slate-400">
              共找到 <span className="text-white font-semibold">{sortedCourses.length}</span> 门课程
            </div>

            <div className="space-y-4">
              {sortedCourses.map((course, index) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  index={index} 
                  isExpanded={expandedCourses.has(course.id)}
                  onToggle={() => toggleExpand(course.id)}
                />
              ))}
            </div>

            {sortedCourses.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                暂无符合条件的课程
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseCard: React.FC<{ course: Course; index: number; isExpanded: boolean; onToggle: () => void }> = ({ 
  course, index, isExpanded, onToggle 
}) => {
  const levelMap: Record<string, string> = {
    beginner: '入门',
    intermediate: '进阶',
    advanced: '高级',
  };

  const hasChildren = course.children && course.children.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-slate-800 rounded-xl overflow-hidden"
    >
      <div className="p-4 sm:p-5">
        <div className="flex gap-4">
          <a href={`#/courses/${course.slug}`} className="flex-shrink-0">
            <img
              src={course.cover_image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'}
              alt={course.title}
              className="w-24 h-16 sm:w-32 sm:h-20 object-cover rounded-lg"
            />
          </a>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <a href={`#/courses/${course.slug}`} className="flex-1">
                <h3 className="text-base sm:text-lg text-white font-semibold line-clamp-1 hover:text-blue-400 transition-colors">
                  {course.title}
                </h3>
              </a>
              {hasChildren && (
                <button
                  onClick={onToggle}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  <span>{course.children?.length}个子课程</span>
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 line-clamp-1">{course.description}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded">{levelMap[course.level || 'beginner']}</span>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-white">{course.rating?.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Users className="w-3 h-3" />
                <span>{course.students_count}</span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="text-lg sm:text-xl font-bold text-white">¥{course.price}</div>
            {course.original_price && course.original_price > (course.price || 0) && (
              <div className="text-xs text-slate-500 line-through">¥{course.original_price}</div>
            )}
          </div>
        </div>
      </div>

      {isExpanded && hasChildren && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-slate-700 bg-slate-800/50"
        >
          <div className="p-4 sm:p-5 pl-8 sm:pl-12 space-y-3">
            <div className="text-xs text-slate-500 mb-2">子课程列表</div>
            {course.children?.map((child, idx) => (
              <a
                key={child.id}
                href={`#/courses/${child.slug}`}
                className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors group"
              >
                <span className="text-xs text-slate-500 w-6">{idx + 1}</span>
                <img
                  src={child.cover_image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'}
                  alt={child.title}
                  className="w-16 h-10 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white font-medium group-hover:text-blue-400 transition-colors line-clamp-1">
                    {child.title}
                  </div>
                  <div className="text-xs text-slate-400 line-clamp-1">{child.description}</div>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="bg-slate-600 text-slate-300 px-2 py-0.5 rounded">{levelMap[child.level || 'beginner']}</span>
                  <span className="text-white font-semibold">¥{child.price}</span>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Courses;