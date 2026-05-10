import React, { useState } from 'react';
import { mockCourses } from '../../data/mockData';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CourseWithExpand {
  id: string;
  title: string;
  cover_image: string;
  instructor_name: string;
  price: number;
  original_price: number;
  students_count: number;
  is_published: boolean;
  parent_id?: string | null;
  children?: CourseWithExpand[];
  expanded?: boolean;
}

const AdminCourses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState<CourseWithExpand[]>(mockCourses.map(c => ({ ...c, expanded: false })));

  const toggleExpand = (id: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, expanded: !c.expanded } : c));
  };

  const togglePublish = (id: string) => {
    setCourses(courses.map(c =>
      c.id === id ? { ...c, is_published: !c.is_published } : c
    ));
  };

  const filteredCourses = courses.filter(c =>
    !c.parent_id && c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price: number) => `¥${price}`;

  const renderCourseRow = (course: CourseWithExpand, level: number = 0) => (
    <React.Fragment key={course.id}>
      <tr className={`hover:bg-gray-50 ${level > 0 ? 'bg-gray-50/50' : ''}`}>
        <td className="px-6 py-4">
          <div className="flex items-center">
            {course.children && course.children.length > 0 && (
              <button
                onClick={() => toggleExpand(course.id)}
                className="mr-2 p-1 hover:bg-gray-200 rounded"
              >
                {course.expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            )}
            {(!course.children || course.children.length === 0) && level === 0 && <span className="w-6 mr-2" />}
            <img src={course.cover_image} alt={course.title} className="w-16 h-12 object-cover rounded" />
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">{course.title}</div>
              <div className="text-sm text-gray-500">{course.instructor_name}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <span className="text-sm font-medium text-gray-900">{formatPrice(course.price)}</span>
        </td>
        <td className="px-6 py-4 text-sm text-gray-500">{course.students_count}</td>
        <td className="px-6 py-4">
          <button
            onClick={() => togglePublish(course.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              course.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}
          >
            {course.is_published ? '已发布' : '草稿'}
          </button>
        </td>
        <td className="px-6 py-4">
          <div className="flex gap-2">
            <button className="text-blue-600 hover:text-blue-800 text-sm">编辑</button>
            <button className="text-red-600 hover:text-red-800 text-sm">删除</button>
            {!course.parent_id && <button className="text-green-600 hover:text-green-800 text-sm">添加子课程</button>}
          </div>
        </td>
      </tr>
      {course.expanded && course.children?.map(child => renderCourseRow({ ...child, children: undefined }, level + 1))}
    </React.Fragment>
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">课程管理</h1>
        <div className="flex gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="搜索课程..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 whitespace-nowrap">
            批量上传
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 whitespace-nowrap">
            添加课程
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">课程</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">价格</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">学员</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredCourses.map(course => renderCourseRow(course))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCourses;