-- =============================================
-- 初始化 RLS 写入策略 + 初始数据
-- 请在 Supabase Dashboard > SQL Editor 中执行
-- =============================================

-- 1. 添加 RLS 策略（允许认证用户写入管理数据）
DO $$ BEGIN
  CREATE POLICY "认证用户可插入分类" ON public.categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可更新分类" ON public.categories FOR UPDATE USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可删除分类" ON public.categories FOR DELETE USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可插入课程" ON public.courses FOR INSERT WITH CHECK (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可查看所有课程" ON public.courses FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可更新课程" ON public.courses FOR UPDATE USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可删除课程" ON public.courses FOR DELETE USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可插入资源分类" ON public.resource_categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可更新资源分类" ON public.resource_categories FOR UPDATE USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可删除资源分类" ON public.resource_categories FOR DELETE USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可插入资源" ON public.resources FOR INSERT WITH CHECK (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可查看所有资源" ON public.resources FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可更新资源" ON public.resources FOR UPDATE USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可删除资源" ON public.resources FOR DELETE USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可插入广告" ON public.advertisements FOR INSERT WITH CHECK (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可更新广告" ON public.advertisements FOR UPDATE USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可删除广告" ON public.advertisements FOR DELETE USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可查看所有用户" ON public.profiles FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可更新用户资料" ON public.profiles FOR UPDATE USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可查看订单" ON public.orders FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可插入订单" ON public.orders FOR INSERT WITH CHECK (auth.role() = 'authenticated');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可更新订单" ON public.orders FOR UPDATE USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "认证用户可管理国家电网资料" ON public.sgcc_materials FOR ALL USING (true) WITH CHECK (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- 2. 插入课程分类初始数据
INSERT INTO public.categories (name, slug, description, icon, sort_order) VALUES
  ('电力巡检 AI', 'power-inspection-ai', '电力设备智能巡检技术', 'zap', 1),
  ('电网调度 AI', 'grid-dispatch-ai', '智能电网调度优化', 'network', 2),
  ('电力数据分析', 'power-data-analysis', '电力大数据分析应用', 'bar-chart-2', 3),
  ('AI 考证辅导', 'ai-certification', 'AI 相关认证考试培训', 'award', 4),
  ('电力物联网', 'power-iot', '电力物联网技术应用', 'cpu', 5)
ON CONFLICT (slug) DO NOTHING;

-- 3. 插入资源分类初始数据
INSERT INTO public.resource_categories (name, slug, description, icon, sort_order) VALUES
  ('课件资料', 'courseware', '课程配套课件', 'file-text', 1),
  ('真题题库', 'exam-papers', '历年考试真题', 'clipboard', 2),
  ('案例集', 'case-studies', '行业实战案例', 'briefcase', 3),
  ('工具包', 'toolkits', '开发工具和代码', 'tool', 4),
  ('行业报告', 'industry-reports', '电力行业研究报告', 'trending-up', 5),
  ('AI 模型教程', 'ai-model-tutorials', 'AI 模型实操指南', 'cpu', 6)
ON CONFLICT (slug) DO NOTHING;

-- 4. 插入课程初始数据
INSERT INTO public.courses (title, slug, description, cover_image, category_id, instructor_name, price, original_price, level, duration_hours, lessons_count, students_count, rating, reviews_count, is_featured, is_published) VALUES
  ('电力巡检 AI 实战课程', 'power-inspection-ai-practice', '从零开始学习电力设备智能巡检，掌握图像识别、缺陷检测等核心技术', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', (SELECT id FROM categories WHERE slug='power-inspection-ai'), '张明博士', 299, 599, 'intermediate', 36, 48, 1256, 4.8, 328, true, true),
  ('智能电网调度系统开发', 'smart-grid-dispatch', '深入学习电网调度 AI 算法，包括负荷预测、优化调度、故障诊断', 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800', (SELECT id FROM categories WHERE slug='grid-dispatch-ai'), '李华教授', 399, 799, 'advanced', 48, 62, 892, 4.9, 256, true, true),
  ('电力大数据分析入门', 'power-bigdata-intro', '零基础学习电力数据分析，掌握 Python、SQL、数据可视化', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', (SELECT id FROM categories WHERE slug='power-data-analysis'), '王强老师', 199, 399, 'beginner', 24, 32, 2341, 4.7, 512, false, true),
  ('AI 工程师认证考试辅导', 'ai-engineer-certification', '针对 AI 工程师认证考试的专项辅导，包含理论讲解、真题解析', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800', (SELECT id FROM categories WHERE slug='ai-certification'), '陈雪老师', 499, 999, 'intermediate', 60, 80, 1567, 4.6, 423, true, true),
  ('电力物联网系统设计', 'power-iot-design', '学习电力物联网架构设计、传感器应用、边缘计算', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', (SELECT id FROM categories WHERE slug='power-iot'), '刘伟博士', 349, 699, 'advanced', 42, 56, 678, 4.8, 189, false, true)
ON CONFLICT (slug) DO NOTHING;

-- 5. 插入广告初始数据
INSERT INTO public.advertisements (title, description, image_url, link_url, position, is_active, priority) VALUES
  ('AI 工程师认证培训', '限时优惠，通过率 98%', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800', '/courses/ai-engineer-certification', 'home_top', true, 1),
  ('电力巡检 AI 实战', '行业热门课程，立即学习', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', '/courses/power-inspection-ai-practice', 'home_sidebar', true, 2);
