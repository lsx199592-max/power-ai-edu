# Vercel 部署 - npm 源超时问题解决方案

## 问题原因
Vercel 构建环境默认使用阿里巴巴内网 npm 源 (registry.anpm.alibaba-inc.com)，导致连接超时。

## 解决方案

### 方法一：在 Vercel Dashboard 配置环境变量（推荐）

1. 登录 [vercel.com](https://vercel.com)
2. 进入项目 → Settings → Environment Variables
3. 添加以下变量：

| 变量名 | 值 |
|--------|-----|
| NPM_CONFIG_REGISTRY | https://registry.npmjs.org |
| PNPM_REGISTRY | https://registry.npmjs.org |

4. 重新部署

### 方法二：修改 vercel.json

在 vercel.json 中添加环境变量：

```json
{
  "env": {
    "NPM_CONFIG_REGISTRY": "https://registry.npmjs.org",
    "PNPM_REGISTRY": "https://registry.npmjs.org"
  }
}
```

### 方法三：使用 .yarnrc.yml（如果使用 yarn）

创建 `.yarnrc.yml` 文件：
```yaml
npmRegistryServer: "https://registry.npmjs.org"
```

## 验证配置

重新部署后，构建日志应显示：
```
registry = https://registry.npmjs.org
```

而不是：
```
registry = https://registry.anpm.alibaba-inc.com
```