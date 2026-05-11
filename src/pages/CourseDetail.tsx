import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Clock, Users, Star, ChevronDown, ChevronUp, ShoppingCart, BookOpen } from 'lucide-react';
import { useCourseBySlug, useChapters, useReviews, useCourses } from '../hooks/useSupabaseData';

const CourseDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { course, loading: cLoading } = useCourseBySlug(slug);
  const { chapters, loading: chLoading } = useChapters(course?.id);
  const { reviews, loading: rLoading } = useReviews(course?.id);
  const { courses: allCourses } = useCourses();
  const relatedCourses = allCourses.filter(c => c.id !== course?.id).slice(0, 3);
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);

  const loading = cLoading || chLoading || rLoading;

  if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center"><div className="text-white">加载中...</div></div>;

  if (!course) return (
    <div className="min-h-screen flex items-center justify-center"><div className="text-center"><h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">课程未找到</h2><Link to="/courses" className="text-blue-600 hover:text-blue-700">返回课程列表</Link></div></div>
  );

  const toggleChapter = (chapterId: string) => { setExpandedChapters(prev => prev.includes(chapterId) ? prev.filter(id => id !== chapterId) : [...prev, chapterId]); };
  const renderStars = (rating: number) => Array.from({ length: 5 }, (_, i) => <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="md:col-span-2">
              <span className="inline-block px-2 sm:px-3 py-1 bg-blue-500 rounded-full text-xs sm:text-sm mb-3 sm:mb-4">{course.level === 'beginner' ? '入门' : course.level === 'intermediate' ? '进阶' : '高级'}</span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{course.title}</h1>
              <p className="text-sm sm:text-base md:text-lg text-blue-100 mb-4 sm:mb-6">{course.description}</p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm">
                <div className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-400 fill-current" /><span className="font-semibold">{course.rating}</span><span className="text-blue-200">({course.reviews_count} 评价)</span></div>
                <div className="flex items-center gap-2"><Users className="w-5 h-5" /><span>{course.students_count} 学员</span></div>
                <div className="flex items-center gap-2"><Clock className="w-5 h-5" /><span>{course.duration_hours} 小时</span></div>
                <div className="flex items-center gap-2"><BookOpen className="w-5 h-5" /><span>{course.lessons_count} 课时</span></div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-xl">
              <img src={course.cover_image || ''} alt={course.title} className="w-full h-32 sm:h-40 object-cover rounded-lg mb-3 sm:mb-4" />
              <div className="flex items-baseline gap-2 mb-3 sm:mb-4"><span className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">¥{course.price}</span>{course.original_price && <span className="text-base sm:text-lg text-gray-400 line-through">¥{course.original_price}</span>}</div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-2.5 sm:py-3 text-sm sm:text-base bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"><ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />立即购买</motion.button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="md:col-span-2 space-y-4 sm:space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">讲师介绍</h2>
              <div className="flex items-center gap-3 sm:gap-4">
                <img src={course.instructor_avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=instructor'} alt={course.instructor_name || ''} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full" />
                <div><h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">{course.instructor_name}</h3><p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">资深 AI 工程师</p></div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">课程大纲</h2>
              <div className="space-y-3">
                {chapters.map(chapter => (
                  <div key={chapter.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                    <button onClick={() => toggleChapter(chapter.id)} className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <span className="font-medium text-gray-900 dark:text-white">{chapter.title}</span>
                      {expandedChapters.includes(chapter.id) ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                    </button>
                    {expandedChapters.includes(chapter.id) && chapter.lessons && (
                      <div className="border-t border-gray-200 dark:border-gray-700">
                        {chapter.lessons.map(lesson => (
                          <div key={lesson.id} className="px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <Play className="w-4 h-4 text-blue-600" /><span className="flex-1 text-gray-700 dark:text-gray-300">{lesson.title}</span><span className="text-sm text-gray-500">{lesson.duration_minutes}分钟</span>
                            {lesson.is_free && <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded">免费试看</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {chapters.length === 0 && <div className="text-slate-400 text-sm">暂无课程大纲</div>}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">学员评价</h2>
              <div className="space-y-3 sm:space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-3 sm:pb-4 last:border-0">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <img src={review.profiles?.avatar_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'} alt="" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
                      <div><h4 className="font-medium text-sm sm:text-base text-gray-900 dark:text-white">{review.profiles?.username}</h4><div className="flex items-center gap-1">{renderStars(review.rating || 0)}</div></div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{review.content}</p>
                  </div>
                ))}
                {reviews.length === 0 && <div className="text-slate-400 text-sm">暂无评价</div>}
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm md:sticky md:top-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">相关课程</h2>
              <div className="space-y-3 sm:space-y-4">
                {relatedCourses.map(c => (
                  <Link key={c.id} to={`/courses/${c.slug}`} className="block group">
                    <div className="flex gap-2 sm:gap-3"><img src={c.cover_image || ''} alt={c.title} className="w-16 h-12 sm:w-20 sm:h-14 object-cover rounded" /><div className="flex-1"><h3 className="font-medium text-xs sm:text-sm text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">{c.title}</h3><p className="text-blue-600 font-semibold text-xs sm:text-sm mt-1">¥{c.price}</p></div></div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
