import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Award, BookOpen, Download, Settings, LogOut } from 'lucide-react';
import { supabase } from '../supabase/client';
import { Profile as ProfileType, Membership, UserCourse, UserResource } from '../types';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [membership, setMembership] = useState<Membership | null>(null);
  const [userCourses, setUserCourses] = useState<UserCourse[]>([]);
  const [userResources, setUserResources] = useState<UserResource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileData) setProfile(profileData);

      const { data: membershipData } = await supabase
        .from('memberships')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (membershipData) setMembership(membershipData);

      const { data: coursesData } = await supabase
        .from('user_courses')
        .select('*')
        .eq('user_id', user.id);

      if (coursesData) setUserCourses(coursesData);

      const { data: resourcesData } = await supabase
        .from('user_resources')
        .select('*')
        .eq('user_id', user.id);

      if (resourcesData) setUserResources(resourcesData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/#/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">加载中...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">请先登录</h2>
          <Link to="/login" className="text-blue-400 hover:text-blue-300">
            前往登录
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="md:col-span-1">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-12 h-12 text-white" />
                  )}
                </div>
                <h2 className="text-xl font-bold text-white">{profile.username}</h2>
                <p className="text-slate-400 text-sm">{profile.email}</p>
                {membership && (
                  <span className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-sm">
                    {membership.plan_type === 'premium' ? '高级会员' : 'VIP会员'}
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-700/50 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors">
                  <Settings className="w-5 h-5" />
                  账户设置
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  退出登录
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
                <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{userCourses.length}</div>
                <div className="text-slate-400 text-sm">已购课程</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
                <Download className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{userResources.length}</div>
                <div className="text-slate-400 text-sm">已购资源</div>
              </div>
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
                <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">
                  {membership ? (membership.plan_type === 'premium' ? '高级' : 'VIP') : '普通'}
                </div>
                <div className="text-slate-400 text-sm">会员等级</div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">我的课程</h3>
              {userCourses.length > 0 ? (
                <div className="space-y-3">
                  {userCourses.map((uc) => (
                    <div key={uc.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div>
                        <div className="text-white">课程ID: {uc.course_id}</div>
                        <div className="text-slate-400 text-sm">进度: {uc.progress}%</div>
                      </div>
                      <Link to={`/courses/${uc.course_id}`} className="text-blue-400 hover:text-blue-300">
                        继续学习
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  暂无已购课程
                  <Link to="/courses" className="block mt-2 text-blue-400 hover:text-blue-300">
                    浏览课程
                  </Link>
                </div>
              )}
            </div>

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">我的资源</h3>
              {userResources.length > 0 ? (
                <div className="space-y-3">
                  {userResources.map((ur) => (
                    <div key={ur.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div className="text-white">资源ID: {ur.resource_id}</div>
                      <button className="text-blue-400 hover:text-blue-300">下载</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-400">
                  暂无已购资源
                  <Link to="/resources" className="block mt-2 text-blue-400 hover:text-blue-300">
                    浏览资源
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;