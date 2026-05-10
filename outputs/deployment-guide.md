# 电力 AI 教育平台 - 国外云服务器部署方案

## 一、部署前检查清单

### ✅ 已完成项目
- [x] 生产构建成功 (bundle.js 655KB)
- [x] dist 目录已生成
- [x] Meoo Cloud 后端服务已配置
- [x] 数据库迁移文件已创建
- [x] 响应式设计已完成
- [x] 所有功能模块已实现

### ⚠️ 需要注意
- framer-motion 依赖 `@emotion/is-prop-valid` 警告（不影响运行）
- 建议后续优化：代码分割减小 bundle 体积

---

## 二、推荐云服务商选择

### 方案 A：Vercel（推荐 ⭐⭐⭐⭐⭐）
**优势：**
- 免费额度充足，适合中小型项目
- 自动 CI/CD，Git 推送即部署
- 全球 CDN 加速
- 与 Supabase 完美配合

**部署步骤：**
1. 注册 Vercel 账号 (vercel.com)
2. 连接 GitHub/GitLab 仓库
3. 配置项目：
   - Framework Preset: Other
   - Build Command: `pnpm run build`
   - Output Directory: `dist`
4. 添加环境变量（如需要）
5. 点击 Deploy

**费用：** 免费版足够，Pro 版 $20/月

---

### 方案 B：AWS S3 + CloudFront
**优势：**
- 企业级稳定性和扩展性
- 精细的访问控制
- 与其他 AWS 服务集成方便

**部署步骤：**

#### 1. 创建 S3 存储桶
```bash
# 安装 AWS CLI
pip install awscli

# 配置 AWS 凭证
aws configure

# 创建存储桶（替换为你的桶名）
aws s3 mb s3://power-ai-edu-your-name

# 启用静态网站托管
aws s3 website s3://power-ai-edu-your-name \
  --index-document index.html \
  --error-document index.html
```

#### 2. 上传构建文件
```bash
# 同步 dist 目录到 S3
aws s3 sync dist/ s3://power-ai-edu-your-name/ \
  --delete \
  --cache-control "max-age=31536000,immutable" \
  --exclude "index.html"

# index.html 不缓存
aws s3 cp dist/index.html s3://power-ai-edu-your-name/index.html \
  --cache-control "no-cache"
```

#### 3. 配置 CloudFront CDN
```bash
# 创建 CloudFront 分配
aws cloudfront create-distribution \
  --origin-domain-name power-ai-edu-your-name.s3-website-us-east-1.amazonaws.com \
  --default-root-object index.html
```

#### 4. 设置存储桶策略（公开读取）
```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::power-ai-edu-your-name/*"
  }]
}
```

**费用估算：**
- S3 存储：$0.023/GB/月
- CloudFront 流量：$0.085-0.14/GB（按区域）
- 预估月费用：$5-20（中小流量）

---

### 方案 C：Google Cloud Platform (Firebase Hosting)
**优势：**
- 免费额度大
- 部署简单快速
- 自动 SSL 证书

**部署步骤：**
```bash
# 安装 Firebase CLI
npm install -g firebase-tools

# 登录
firebase login

# 初始化项目
firebase init hosting

# 部署
firebase deploy
```

**firebase.json 配置：**
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [{
      "source": "**",
      "destination": "/index.html"
    }]
  }
}
```

**费用：** 免费版 10GB/月 流量，超出后 $0.15/GB

---

### 方案 D：DigitalOcean App Platform
**优势：**
- 简单易用
- 价格透明
- 适合中小项目

**部署步骤：**
1. 注册 DigitalOcean 账号
2. 创建 App Platform 应用
3. 连接 Git 仓库
4. 配置：
   - Type: Static Site
   - Build Command: `pnpm run build`
   - Output Directory: `dist`
5. 部署

**费用：** $5/月起

---

## 三、Nginx 自建服务器方案（VPS）

### 服务器配置建议
- **最低配置：** 1核 1GB 内存 25GB SSD
- **推荐配置：** 2核 2GB 内存 50GB SSD
- **服务商推荐：** Vultr、DigitalOcean、Linode、AWS Lightsail

### 部署步骤

#### 1. 购买服务器并连接
```bash
ssh root@your-server-ip
```

#### 2. 安装 Nginx
```bash
# Ubuntu/Debian
apt update && apt install nginx -y

# CentOS
yum install epel-release -y && yum install nginx -y
```

#### 3. 上传构建文件
```bash
# 本地执行
scp -r dist/* root@your-server-ip:/var/www/power-ai-edu/
```

#### 4. 配置 Nginx
```nginx
# /etc/nginx/sites-available/power-ai-edu
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/power-ai-edu;
    index index.html;

    # SPA 路由支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip 压缩
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    gzip_min_length 1000;
}
```

#### 5. 启用配置
```bash
ln -s /etc/nginx/sites-available/power-ai-edu /etc/nginx/sites-enabled/
nginx -t && systemctl restart nginx
```

#### 6. 配置 SSL（Let's Encrypt）
```bash
# 安装 Certbot
apt install certbot python3-certbot-nginx -y

# 获取证书
certbot --nginx -d your-domain.com

# 自动续期
certbot renew --dry-run
```

**费用估算：**
- VPS：$5-20/月
- 域名：$10-15/年
- SSL：免费

---

## 四、CI/CD 自动化部署

### GitHub Actions 配置
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install pnpm
        run: npm install -g pnpm
        
      - name: Install dependencies
        run: pnpm install
        
      - name: Build
        run: pnpm run build
        
      - name: Deploy to S3
        if: github.ref == 'refs/heads/main'
        run: |
          aws s3 sync dist/ s3://your-bucket-name/ --delete
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: us-east-1
```

---

## 五、域名配置

### DNS 解析设置
| 类型 | 名称 | 值 |
|------|------|-----|
| A | @ | 服务器IP或CDN IP |
| CNAME | www | your-domain.com |

### 推荐域名注册商
- Namecheap（便宜，隐私保护免费）
- Cloudflare（免费，集成CDN）
- Google Domains

---

## 六、性能优化建议

### 1. 启用 CDN
- 所有方案都建议启用 CDN
- 减少延迟，提升全球访问速度

### 2. 资源压缩
- 已启用 Webpack 生产模式压缩
- Nginx 启用 Gzip

### 3. 缓存策略
- 静态资源：1年缓存
- index.html：不缓存

### 4. 图片优化
- 使用 WebP 格式
- 启用懒加载

---

## 七、监控与运维

### 推荐工具
- **Uptime 监控：** UptimeRobot（免费）
- **性能监控：** Google Analytics
- **错误追踪：** Sentry（免费额度）

### 日志收集
```bash
# Nginx 日志位置
/var/log/nginx/access.log
/var/log/nginx/error.log
```

---

## 八、安全建议

1. **启用 HTTPS**：所有方案都支持免费 SSL
2. **设置 HSTS**：强制 HTTPS
3. **配置 CSP**：防止 XSS 攻击
4. **定期备份**：数据库和静态文件

---

## 九、推荐方案总结

| 方案 | 难度 | 费用 | 推荐场景 |
|------|------|------|----------|
| Vercel | ⭐ | 免费-$20/月 | 个人/小团队首选 |
| Firebase | ⭐⭐ | 免费-$15/月 | 快速上线 |
| AWS S3+CF | ⭐⭐⭐ | $5-20/月 | 企业级需求 |
| DigitalOcean | ⭐⭐ | $5/月起 | 中等流量 |
| VPS+Nginx | ⭐⭐⭐⭐ | $5-20/月 | 完全控制 |

**最终推荐：Vercel** - 零配置、免费额度充足、自动部署，最适合本项目。

---

## 十、快速部署命令汇总

### Vercel 一键部署
```bash
npx vercel --prod
```

### Firebase 部署
```bash
firebase deploy --only hosting
```

### AWS S3 部署
```bash
aws s3 sync dist/ s3://your-bucket/ --delete
```

### 自建服务器部署
```bash
rsync -avz dist/ user@server:/var/www/html/
```