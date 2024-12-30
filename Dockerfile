# 阶段 1: 构建 Vue 3 前端 (client)
FROM node:22-alpine AS client-build

# 设置工作目录
WORKDIR /app/client

# 复制 Vue 项目文件并安装依赖
COPY ./lyf-ui ./
RUN npm i -g pnpm && pnpm install && npm run build -- --mode production

# 阶段 2: 构建 NestJS 后端 (admin)
FROM node:22-alpine AS admin-build

# 设置工作目录
WORKDIR /app/admin

# 编译 NestJS 项目
COPY ./lyf-admin ./
RUN npm install && npm run build

# 阶段 3: 生产环境构建和启动
FROM node:22-alpine AS production

# 设置工作目录
WORKDIR /app

# 复制已编译的 Vue 前端文件到 NestJS 后端的 dist 目录
COPY --from=client-build /app/client/dist /app/dist

# 复制已编译的 NestJS 后端文件
COPY --from=admin-build /app/admin/dist /app/dist

# 安装生产依赖
COPY ./lyf-admin/package.json ./lyf-admin/package-lock.json ./lyf-admin/prisma  ./
RUN npm install --omit=dev

# 启动 NestJS 项目
EXPOSE 3000
CMD ["npm", "run", "start:prod"]