#!/bin/bash
set -e

echo "🔍 测试健康检查..."
curl -sf http://localhost:8000/health | grep -q "healthy" && echo "✅ OK"

echo "📝 测试创建工作流..."
WF_ID=$(curl -sf -X POST http://localhost:8000/workflows \
  -H "Content-Type: application/json" \
  -d '{"name":"CI 测试"}' | jq -r .id)

echo "📋 测试获取列表..."
curl -sf http://localhost:8000/workflows | grep -q "CI 测试" && echo "✅ OK"

echo "🔍 测试向量搜索..."
curl -sf -X POST http://localhost:8000/search \
  -H "Content-Type: application/json" \
  -d '{"query_vector":[0.1,0.2,0.3,0.4]}' | grep -q "数据分析流程" && echo "✅ OK"

echo "🎉 所有测试通过！"