import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('请填写所有字段');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const email = formData.username.includes('@') 
        ? formData.username 
        : `${formData.username}@meoo.local`;
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: formData.password,
      });
      if (signInError) throw signInError;
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', (await supabase.auth.getUser()).data.user?.id || '').single();
      navigate(profile?.role === 'admin' || profile?.role === 'premium' ? '/admin' : '/');
    } catch (err: any) {
      setError(err.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    await supabase.auth.signInWithOAuth({ provider });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">欢迎回来</h1>
            <p className="text-gray-300">登录您的账户继续学习</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4 text-red-200 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">用户名 / 邮箱</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="请输入用户名或邮箱"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">密码</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  placeholder="请输入密码"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50"
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-white/20"></div>
            <span className="px-4 text-gray-400 text-sm">或</span>
            <div className="flex-1 border-t border-white/20"></div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleOAuthLogin('google')}
              className="w-full bg-white text-gray-800 font-medium py-3 rounded-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
            >
              <i className="fab fa-google text-lg"></i>
              使用 Google 登录
            </button>
            <button
              onClick={() => handleOAuthLogin('github')}
              className="w-full bg-gray-800 text-white font-medium py-3 rounded-lg hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
            >
              <i className="fab fa-github text-lg"></i>
              使用 GitHub 登录
            </button>
          </div>

          <p className="text-center text-gray-300 mt-6">
            还没有账户？{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
              立即注册
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;