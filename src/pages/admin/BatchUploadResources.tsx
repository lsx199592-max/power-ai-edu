import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Check, AlertCircle, File, Image, FileText, Film, Music } from 'lucide-react';
import { mockResourceCategories } from '../../data/mockData';

interface UploadFile {
  id: string;
  file: File;
  name: string;
  size: number;
  progress: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  categoryId: string;
  price: number;
  isFree: boolean;
  errorMsg?: string;
}

const fileIcons: Record<string, React.ReactNode> = {
  image: <Image className="w-8 h-8 text-purple-500" />,
  pdf: <FileText className="w-8 h-8 text-red-500" />,
  video: <Film className="w-8 h-8 text-blue-500" />,
  audio: <Music className="w-8 h-8 text-green-500" />,
  default: <File className="w-8 h-8 text-gray-500" />,
};

const getFileIcon = (filename: string) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return fileIcons.image;
  if (['pdf'].includes(ext || '')) return fileIcons.pdf;
  if (['mp4', 'avi', 'mov'].includes(ext || '')) return fileIcons.video;
  if (['mp3', 'wav', 'ogg'].includes(ext || '')) return fileIcons.audio;
  return fileIcons.default;
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const BatchUploadResources: React.FC = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [globalCategory, setGlobalCategory] = useState('');
  const [globalPrice, setGlobalPrice] = useState(0);
  const [globalIsFree, setGlobalIsFree] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  }, []);

  const addFiles = (newFiles: File[]) => {
    const uploadFiles: UploadFile[] = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'pending',
      categoryId: globalCategory || '1',
      price: globalIsFree ? 0 : globalPrice,
      isFree: globalIsFree,
    }));
    setFiles(prev => [...prev, ...uploadFiles]);
  };

  const updateFile = (id: string, updates: Partial<UploadFile>) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const retryUpload = (id: string) => {
    updateFile(id, { status: 'pending', progress: 0, errorMsg: undefined });
  };

  const simulateUpload = (file: UploadFile) => {
    updateFile(file.id, { status: 'uploading' });
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress >= 100) {
        clearInterval(interval);
        const hasError = Math.random() < 0.1;
        if (hasError) {
          updateFile(file.id, { status: 'error', errorMsg: '网络错误，请重试' });
        } else {
          updateFile(file.id, { progress: 100, status: 'success' });
        }
      } else {
        updateFile(file.id, { progress });
      }
    }, 300);
  };

  const startUpload = () => {
    const pendingFiles = files.filter(f => f.status === 'pending');
    if (pendingFiles.length === 0) return;
    pendingFiles.forEach(file => simulateUpload(file));
  };

  const applyGlobalSettings = () => {
    setFiles(prev => prev.map(f => ({
      ...f,
      categoryId: globalCategory || f.categoryId,
      price: globalIsFree ? 0 : globalPrice,
      isFree: globalIsFree,
    })));
  };

  const clearAll = () => {
    setFiles([]);
    setShowSuccess(false);
  };

  const successCount = files.filter(f => f.status === 'success').length;
  const errorCount = files.filter(f => f.status === 'error').length;
  const pendingCount = files.filter(f => f.status === 'pending').length;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">批量上传资源</h1>
        {files.length > 0 && (
          <button onClick={clearAll} className="text-red-500 hover:text-red-700 text-sm">
            清空全部
          </button>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border border-blue-100"
      >
        <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          批量设置
        </h3>
        <div className="flex flex-wrap gap-4 items-center">
          <select
            value={globalCategory}
            onChange={(e) => setGlobalCategory(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">选择分类</option>
            {mockResourceCategories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="价格"
            value={globalPrice}
            onChange={(e) => setGlobalPrice(Number(e.target.value))}
            className="px-3 py-2 border rounded-lg w-24 focus:ring-2 focus:ring-blue-500"
            disabled={globalIsFree}
          />
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={globalIsFree}
              onChange={(e) => setGlobalIsFree(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-gray-700">免费资源</span>
          </label>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={applyGlobalSettings}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            应用到全部
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        animate={{
          scale: isDragging ? 1.02 : 1,
          borderColor: isDragging ? '#3b82f6' : '#e5e7eb',
          backgroundColor: isDragging ? '#eff6ff' : '#ffffff',
        }}
        className="border-2 border-dashed rounded-xl p-10 text-center mb-6 cursor-pointer transition-colors"
      >
        <input
          type="file"
          multiple
          onChange={(e) => e.target.files && addFiles(Array.from(e.target.files))}
          className="hidden"
          id="file-input"
        />
        <motion.div
          animate={{ y: isDragging ? -5 : 0 }}
          className="flex flex-col items-center"
        >
          <Upload className={`w-14 h-14 mb-4 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
          <p className="text-gray-600 font-medium mb-1">拖拽文件到此处上传</p>
          <p className="text-sm text-gray-400 mb-4">或点击选择文件</p>
          <label
            htmlFor="file-input"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
          >
            选择文件
          </label>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-4 text-sm">
                <span className="text-gray-600">共 {files.length} 个文件</span>
                {successCount > 0 && <span className="text-green-600 flex items-center gap-1"><Check className="w-4 h-4" /> {successCount} 成功</span>}
                {errorCount > 0 && <span className="text-red-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errorCount} 失败</span>}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startUpload}
                disabled={pendingCount === 0}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                开始上传 {pendingCount > 0 && `(${pendingCount})`}
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {files.map((file) => (
                  <motion.div
                    key={file.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`bg-white rounded-xl p-4 shadow-sm border-2 ${
                      file.status === 'success' ? 'border-green-200 bg-green-50' :
                      file.status === 'error' ? 'border-red-200 bg-red-50' :
                      'border-gray-100'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">{getFileIcon(file.name)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatSize(file.size)}</p>
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3 space-y-2">
                      <select
                        value={file.categoryId}
                        onChange={(e) => updateFile(file.id, { categoryId: e.target.value })}
                        className="w-full text-sm px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500"
                      >
                        {mockResourceCategories.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>

                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={file.isFree ? 0 : file.price}
                          onChange={(e) => updateFile(file.id, { price: Number(e.target.value) })}
                          disabled={file.isFree}
                          className="flex-1 text-sm px-2 py-1 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                          placeholder="价格"
                        />
                        <label className="flex items-center gap-1 text-xs cursor-pointer">
                          <input
                            type="checkbox"
                            checked={file.isFree}
                            onChange={(e) => updateFile(file.id, { isFree: e.target.checked, price: 0 })}
                            className="rounded"
                          />
                          免费
                        </label>
                      </div>
                    </div>

                    {file.status === 'uploading' && (
                      <div className="mt-3">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${file.progress}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-right">{Math.round(file.progress)}%</p>
                      </div>
                    )}

                    {file.status === 'success' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3 flex items-center gap-1 text-green-600 text-sm"
                      >
                        <Check className="w-4 h-4" />
                        <span>上传成功</span>
                      </motion.div>
                    )}

                    {file.status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-3"
                      >
                        <p className="text-xs text-red-500 mb-1">{file.errorMsg}</p>
                        <button
                          onClick={() => retryUpload(file.id)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          重试
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {successCount === files.length && files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            <span>全部上传完成！</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BatchUploadResources;