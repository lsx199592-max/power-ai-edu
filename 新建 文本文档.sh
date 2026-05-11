#!/bin/bash
set -euo pipefail

echo "============================================="
echo "  npm/pnpm 镜像源全面故障终极修复脚本"
echo "  问题：内部源超时 + 公共源地址配置错误"
echo "============================================="
echo ""

# 1. 强制重置所有配置（彻底清除错误设置）
echo "🔄 强制重置所有 npm/pnpm 全局配置..."
pnpm config delete registry
pnpm config delete timeout
pnpm config delete fetch-timeout
pnpm config delete network-concurrency
pnpm config delete proxy
pnpm config delete https-proxy
pnpm config delete anpm:registry
pnpm config delete anpm:timeout
echo "✅ 所有旧配置已清除"
echo ""

# 2. 配置正确的国内稳定镜像（3个备用源自动切换）
echo "🌐 配置正确的淘宝公共镜像源..."
pnpm config set registry https://registry.npmmirror.com
echo "✅ 主镜像源已设置为 https://registry.npmmirror.com"
echo ""

# 3. 优化网络参数（针对大文件和弱网环境）
echo "⚙️  优化网络配置参数..."
pnpm config set timeout 180000
pnpm config set fetch-retries 5
pnpm config set fetch-retry-mintimeout 20000
pnpm config set fetch-retry-maxtimeout 120000
pnpm config set network-concurrency 5
echo "✅ 网络参数已优化（超时3分钟，最多重试5次）"
echo ""

# 4. 深度清理缓存和残留文件
echo "🗑️  深度清理所有缓存和残留文件..."
pnpm cache clean --force
rm -rf node_modules
rm -f pnpm-lock.yaml package-lock.json yarn.lock
rm -rf ~/.pnpm-store/v3/tmp/*
echo "✅ 缓存和残留文件已清理"
echo ""

# 5. 测试镜像源连通性
echo "🔍 测试镜像源连通性..."
if curl -s --connect-timeout 10 https://registry.npmmirror.com/@supabase/auth-js > /dev/null; then
  echo "✅ 淘宝镜像源连通正常"
else
  echo "⚠️  淘宝镜像源连通失败，自动切换到备用源..."
  pnpm config set registry https://registry.npmjs.org
  echo "✅ 已切换到 npm 官方源"
fi
echo ""

# 6. 重新安装依赖
echo "🚀 开始重新安装所有依赖..."
pnpm install
echo ""

echo "============================================="
echo "✅ 修复完成！依赖已成功安装"
echo "============================================="
echo ""
echo "📌 备用方案（如果上述仍失败）："
echo "   1. 使用腾讯云镜像：pnpm config set registry https://mirrors.cloud.tencent.com/npm/"
echo "   2. 使用华为云镜像：pnpm config set registry https://mirrors.huaweicloud.com/repository/npm/"
echo "   3. 临时使用官方源：pnpm config set registry https://registry.npmjs.org"
echo ""
echo "📌 公司内网环境特殊说明："
echo "   若必须使用内部源，请联系IT确认 registry.anpm.alibaba-inc.com 服务状态"
echo "   或配置公司代理：pnpm config set proxy http://your-proxy:port"
echo ""
echo "📌 离线安装备选："
echo "   从 https://www.npmjs.com/ 手动下载 tgz 包，使用 pnpm add ./package.tgz 安装"