import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileSpreadsheet, Check, X, Download, AlertCircle, Edit2, Save } from 'lucide-react';

interface PreviewCourse {
  id: string;
  title: string;
  slug: string;
  price: number;
  category: string;
  level: string;
  valid: boolean;
  error?: string;
  isEditing?: boolean;
}

const BatchUploadCourses: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<PreviewCourse[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) processFile(selectedFile);
  };

  const processFile = (f: File) => {
    setFile(f);
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          parseData();
          return 100;
        }
        return p + 10;
      });
    }, 100);
  };

  const parseData = () => {
    const mockData: PreviewCourse[] = [
      { id: '1', title: '电力巡检基础', slug: 'power-basic', price: 99, category: '电力巡检 AI', level: 'beginner', valid: true },
      { id: '2', title: '智能电网入门', slug: 'grid-intro', price: 129, category: '电网调度 AI', level: 'beginner', valid: true },
      { id: '3', title: '', slug: 'invalid', price: 0, category: '', level: '', valid: false, error: '课程名称不能为空' },
    ];
    setPreviewData(mockData);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.name.match(/\.(csv|xlsx)$/)) processFile(droppedFile);
  };

  const downloadTemplate = () => {
    const csv = '课程名称,slug,价格,分类,级别\n电力巡检基础,power-basic,99,电力巡检 AI,beginner';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '课程导入模板.csv';
    a.click();
  };

  const toggleEdit = (id: string) => {
    setPreviewData(prev => prev.map(item => 
      item.id === id ? { ...item, isEditing: !item.isEditing } : item
    ));
  };

  const updateItem = (id: string, field: keyof PreviewCourse, value: string | number) => {
    setPreviewData(prev => prev.map(item => {
      if (item.id !== id) return item;
      const updated = { ...item, [field]: value };
      updated.valid = !!updated.title;
      return updated;
    }));
  };

  const handleConfirm = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFile(null);
      setPreviewData([]);
    }, 2000);
  };

  const validCount = previewData.filter(d => d.valid).length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">批量上传课程</h1>
        <button onClick={downloadTemplate} className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
          <Download className="w-4 h-4" />
          下载模板
        </button>
      </div>

      <motion.div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        animate={{ scale: isDragging ? 1.02 : 1, borderColor: isDragging ? '#3b82f6' : '#d1d5db' }}
        className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
      >
        <input ref={fileInputRef} type="file" accept=".csv,.xlsx" onChange={handleFileSelect} className="hidden" />
        <motion.div animate={{ y: isDragging ? -5 : 0 }}>
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        </motion.div>
        <p className="text-gray-600 mb-2">拖拽文件到此处，或点击上传</p>
        <p className="text-sm text-gray-400">支持 Excel (.xlsx) 或 CSV (.csv) 格式</p>
      </motion.div>

      <AnimatePresence>
        {isUploading && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>正在解析文件...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div className="h-full bg-blue-500" initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {file && !isUploading && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-6">
            <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg">
              <FileSpreadsheet className="w-5 h-5 text-green-600" />
              <span className="text-gray-700 flex-1">{file.name}</span>
              <button onClick={() => { setFile(null); setPreviewData([]); }} className="text-red-500 hover:bg-red-50 p-1 rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {previewData.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">导入预览</h3>
              <div className="flex gap-4 text-sm">
                <span className="text-green-600">有效: {validCount}</span>
                <span className="text-red-600">无效: {previewData.length - validCount}</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">状态</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">课程名称</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">分类</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">价格</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">级别</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {previewData.map((item) => (
                    <motion.tr key={item.id} layout className={item.valid ? '' : 'bg-red-50'}>
                      <td className="px-4 py-3">
                        {item.valid ? <Check className="w-5 h-5 text-green-600" /> : <AlertCircle className="w-5 h-5 text-red-600" />}
                      </td>
                      <td className="px-4 py-3">
                        {item.isEditing ? (
                          <input value={item.title} onChange={(e) => updateItem(item.id, 'title', e.target.value)} className="border rounded px-2 py-1 w-full" />
                        ) : (
                          <div>
                            <span className={item.valid ? '' : 'text-red-500'}>{item.title || '必填'}</span>
                            {item.error && <span className="text-xs text-red-500 block">{item.error}</span>}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">{item.category}</td>
                      <td className="px-4 py-3 text-sm">¥{item.price}</td>
                      <td className="px-4 py-3 text-sm">{item.level}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => toggleEdit(item.id)} className="text-blue-600 hover:text-blue-800">
                          {item.isEditing ? <Save className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-end">
              <button onClick={handleConfirm} disabled={validCount === 0} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition">
                确认导入 ({validCount} 门课程)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <motion.div className="bg-white rounded-xl p-8 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2">导入成功</h3>
              <p className="text-gray-600">成功导入 {validCount} 门课程</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BatchUploadCourses;
