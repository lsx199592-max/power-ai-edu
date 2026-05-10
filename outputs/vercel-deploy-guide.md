# Vercel 部署指南

## 快速部署步骤

### 1. 准备代码
项目已配置好 `vercel.json`，无需额外修改。

### 2. 部署方式

#### 方式一：Vercel CLI（推荐）
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

#### 方式二：Git 集成
1. 将代码推送到 GitHub/GitLab
2. 登录 [vercel.com](https://vercel.com)
3. 点击 "Add New Project"
4. 选择仓库导入
5. 配置：
   - Framework Preset: **Other**
   - Build Command: `pnpm run build`
   - Output Directory: `dist`
6. 点击 Deploy

### 3. 环境变量配置
在 Vercel Dashboard → Project Settings → Environment Variables 中添加：
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
```

### 4. 自定义域名
1. 进入 Project Settings → Domains
2. 添加你的域名
3. 按提示配置 DNS

### 5. 部署完成
- 网站地址：`https://your-project.vercel.app`
- 后台地址：`https://your-project.vercel.app/#/admin`

## 自动部署
每次推送到 main 分支会自动触发部署。

## 免费额度
- 带宽：100GB/月
- 构建：6000分钟/月
- 足够中小型项目使用
