# 电力 AI 教育平台 - Vercel 详细部署文档

## 一、部署前准备

### 1.1 环境要求
- Node.js 18+ 
- pnpm 8+
- Git

### 1.2 项目结构确认
```
/home/project/
├── dist/                 # 构建输出目录
├── src/                  # 源代码
├── migrations/           # 数据库迁移文件
├── vercel.json          # Vercel 配置文件
├── package.json         # 依赖配置
└── webpack.config.js    # 构建配置
```

---

## 二、Vercel 账号准备

### 2.1 注册账号
1. 访问 [vercel.com](https://vercel.com)
2. 点击 "Sign Up"
3. 选择使用 GitHub/GitLab/Bitbucket 账号登录（推荐 GitHub）

### 2.2 验证邮箱
- 登录后完成邮箱验证
- 绑定手机号（可选，但推荐）

---

## 三、部署方式

### 方式一：GitHub 集成部署（推荐）

#### 步骤 1：创建 GitHub 仓库
```bash
# 在项目根目录初始化 git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 创建 GitHub 仓库并推送
git remote add origin https://github.com/yourusername/power-ai-edu.git
git branch -M main
git push -u origin main
```

#### 步骤 2：Vercel 导入项目
1. 登录 [vercel.com](https://vercel.com)
2. 点击 "Add New Project"
3. 选择 "Import Git Repository"
4. 找到 `power-ai-edu` 仓库，点击 "Import"

#### 步骤 3：配置项目
| 配置项 | 值 |
|--------|-----|
| Framework Preset | Other |
| Build Command | `pnpm run build` |
| Output Directory | `dist` |
| Install Command | `pnpm install` |

#### 步骤 4：环境变量
点击 "Environment Variables"，添加：
```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

#### 步骤 5：部署
点击 "Deploy"，等待构建完成。

---

### 方式二：Vercel CLI 部署

#### 步骤 1：安装 CLI
```bash
npm install -g vercel
```

#### 步骤 2：登录
```bash
vercel login
# 按提示完成浏览器授权
```

#### 步骤 3：部署
```bash
# 进入项目目录
cd /home/project

# 预览部署
vercel

# 生产部署
vercel --prod
```

#### 步骤 4：配置环境变量
```bash
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
```

---

### 方式三：Vercel API 部署

#### 步骤 1：获取 Token
1. 访问 [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. 创建新 Token，复制保存

#### 步骤 2：使用 API 部署
```bash
# 创建项目
curl -X POST "https://api.vercel.com/v9/projects" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "power-ai-edu",
    "framework": null,
    "buildCommand": "pnpm run build",
    "outputDirectory": "dist",
    "installCommand": "pnpm install"
  }'

# 部署
curl -X POST "https://api.vercel.com/v13/deployments" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "power-ai-edu",
    "project": "power-ai-edu",
    "target": "production"
  }'
```

---

## 四、配置文件详解

### vercel.json
```json
{
  "version": 2,
  "name": "power-ai-edu",
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/bundle.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 配置说明
- **builds**: 指定构建配置
- **routes**: SPA 路由回退
- **headers**: 安全头和缓存策略

---

## 五、自定义域名配置

### 5.1 添加域名
1. 进入 Vercel Dashboard → 项目 → Settings → Domains
2. 输入你的域名，如 `edu.powerai.com`
3. 点击 "Add"

### 5.2 DNS 配置
根据 Vercel 提示，在域名服务商处添加 DNS 记录：

**方式 A：A 记录**
```
类型: A
主机: @
值: 76.76.21.21
```

**方式 B：CNAME 记录**
```
类型: CNAME
主机: www
值: cname.vercel-dns.com
```

### 5.3 HTTPS 配置
- Vercel 自动提供 SSL 证书
- 支持自动续期
- 强制 HTTPS 跳转

---

## 六、环境变量管理

### 6.1 通过 Dashboard 设置
1. 项目 → Settings → Environment Variables
2. 添加变量：
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

### 6.2 通过 CLI 设置
```bash
vercel env add SUPABASE_URL production
vercel env add SUPABASE_ANON_KEY production
```

### 6.3 敏感信息保护
- 环境变量加密存储
- 仅构建时可访问
- 前端代码中不要直接暴露

---

## 七、CI/CD 配置

### 7.1 自动部署
- 推送到 `main` 分支 → 自动部署到生产环境
- 推送到其他分支 → 生成预览链接

### 7.2 部署钩子
```bash
# 创建部署钩子
curl -X POST "https://api.vercel.com/v9/projects/power-ai-edu/deploy-hooks" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"name": "Custom Deploy", "ref": "main"}'
```

### 7.3 GitHub Actions 集成
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action-deploy@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 八、性能优化

### 8.1 缓存策略
- 静态资源：1年缓存
- HTML：不缓存
- API 响应：按需配置

### 8.2 Edge Network
- 全球 CDN 加速
- 自动就近访问
- 无需额外配置

### 8.3 图片优化
- 使用 WebP 格式
- 启用懒加载
- 响应式图片

---

## 九、监控与日志

### 9.1 查看日志
```bash
vercel logs power-ai-edu
```

### 9.2 分析面板
- 访问 Vercel Dashboard → Analytics
- 查看访问量、性能指标
- 实时监控错误率

### 9.3 集成第三方监控
- Sentry：错误追踪
- Google Analytics：访问统计
- LogRocket：用户行为回放

---

## 十、常见问题

### Q1: 构建失败
**解决：**
```bash
# 本地测试构建
pnpm run build

# 检查依赖
pnpm install
```

### Q2: 路由 404
**解决：**
- 确认 `vercel.json` 中 routes 配置正确
- 使用 HashRouter 已配置

### Q3: 环境变量不生效
**解决：**
- 重新部署
- 检查变量名拼写
- 确认 Production 环境

### Q4: 自定义域名不生效
**解决：**
- 等待 DNS 传播（最长 48 小时）
- 检查 DNS 记录是否正确
- 确认域名已验证

---

## 十一、费用说明

### 免费版 (Hobby)
- 带宽：100GB/月
- 构建：6000分钟/月
- 团队成员：1人
- 自定义域名：支持
- SSL 证书：自动

### Pro 版 ($20/月)
- 带宽：1TB/月
- 构建：无限制
- 团队成员：10人
- 分析功能：完整
- 密码保护：支持

**本项目免费版足够使用**

---

## 十二、部署后检查清单

- [ ] 网站可正常访问
- [ ] 后台管理可登录
- [ ] 课程列表显示正常
- [ ] 资源下载功能正常
- [ ] 会员购买链接跳转正常
- [ ] 广告展示正常
- [ ] 移动端适配正常
- [ ] HTTPS 证书有效
- [ ] 自定义域名生效

---

## 十三、联系支持

- Vercel 文档：[vercel.com/docs](https://vercel.com/docs)
- Vercel 支持：[vercel.com/help](https://vercel.com/help)
- 社区论坛：[github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
