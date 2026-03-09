# Letitia 个人主页

基于 Next.js（React + TypeScript）的全栈个人介绍站，支持中/英切换与数字分身问答。

## 技术栈

- **前端**: React 18、TypeScript、CSS Modules
- **全栈框架**: Next.js 14（Node 服务端）
- **多语言**: 中文 / English（路径 `/zh`、`/en`）

## 本地运行

```bash
# 安装依赖
npm install

# 开发模式（热更新）
npm run dev
```

浏览器访问：**http://localhost:3000**（会自动跳转到 http://localhost:3000/zh ）

- 中文首页：http://localhost:3000/zh  
- 英文首页：http://localhost:3000/en  

## 生产构建与启动

```bash
npm run build
npm start
```

服务默认运行在 **http://localhost:3000**。

## 使用 Nginx 部署

1. 先在本机构建并启动 Next 服务（见上方 `npm run build` 与 `npm start`）。
2. 将项目中的 `nginx.conf` 作为参考，在服务器上配置 Nginx 反向代理到 `http://127.0.0.1:3000`。
3. 重启 Nginx 后，通过 80 端口访问站点。

## 头像

请将个人头像放到 **`public/avatar.jpg`**。若未放置，页面会显示首字母作为占位。

## 项目结构概要

- `app/` - Next.js App Router（页面与全局样式）
- `app/[locale]/` - 多语言路由（zh / en）
- `app/api/chat/` - 数字分身问答接口
- `components/` - 首页组件（Hero、About、Chat）
- `i18n/` - 中英文文案

## 说明

- 数字分身当前为规则式回答（基于关键词），可根据需要后续接入大模型 API。
