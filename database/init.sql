-- 启用 pgvector 扩展
CREATE EXTENSION IF NOT EXISTS vector;

-- 模拟向量表
CREATE TABLE IF NOT EXISTS workflow_embeddings (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    embedding vector(4)  -- 4维向量，仅用于演示
);

-- 插入模拟数据
INSERT INTO workflow_embeddings (content, embedding)
VALUES
  ('数据分析流程', '[0.1, 0.2, 0.3, 0.4]'),
  ('用户注册流程', '[0.9, 0.8, 0.7, 0.6]'),
  ('审批工作流', '[0.5, 0.5, 0.5, 0.5]');