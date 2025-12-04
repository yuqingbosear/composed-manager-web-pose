
---

#### `ARCHITECTURE.md`
```md
# 架构设计文档

## 技术选型

- **后端**：FastAPI  
  - 高性能异步框架，自动生成 OpenAPI 文档，Pydantic 类型校验
- **前端**：React + TypeScript + Vite  
  - 快速 HMR、类型安全、现代化构建
- **数据库**：PostgreSQL + pgvector  
  - 支持向量存储与相似度搜索，适用于 AI 应用场景

## 目录说明

- `/backend`：FastAPI 应用
- `/frontend`：React 前端
- `/database/init.sql`：数据库初始化脚本（含向量表）
- `docker-compose.yml`：服务编排（含健康检查、依赖管理）
- `api-specs.yaml`：OpenAPI 3.0 契约
- `.env.example`：环境变量模板

## 开发流程

1. 安装 Docker 和 Docker Compose
2. 复制 `.env.example` 到 `.env`
3. 运行 `docker compose up -d --build`
4. 前端自动代理到后端（开发时）或通过 Docker 访问