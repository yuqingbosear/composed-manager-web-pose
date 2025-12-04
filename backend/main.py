from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid
import math
import os

app = FastAPI(title="Workflow API with Vector Search")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class WorkflowCreate(BaseModel):
    name: str
    description: Optional[str] = None

class Workflow(BaseModel):
    id: str
    name: str
    description: Optional[str] = None

# 内存模拟数据库
workflows_db = {}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/workflows", response_model=Workflow)
def create_workflow(workflow: WorkflowCreate):
    wf_id = str(uuid.uuid4())
    workflows_db[wf_id] = Workflow(id=wf_id, **workflow.dict())
    return workflows_db[wf_id]

@app.get("/workflows", response_model=List[Workflow])
def list_workflows():
    return list(workflows_db.values())

@app.get("/workflows/{wf_id}", response_model=Workflow)
def get_workflow(wf_id: str):
    return workflows_db[wf_id]

# ===== B1: 向量搜索（模拟）=====
@app.post("/search")
def vector_search(
    query_vector: List[float] = Body(..., embed=True),
    limit: int = 5
):
    # 模拟数据库中的向量
    mock_data = [
        {"id": 1, "content": "数据分析流程", "embedding": [0.1, 0.2, 0.3, 0.4]},
        {"id": 2, "content": "用户注册流程", "embedding": [0.9, 0.8, 0.7, 0.6]},
        {"id": 3, "content": "审批工作流", "embedding": [0.5, 0.5, 0.5, 0.5]},
    ]
    results = []
    for item in mock_data:
        # 欧氏距离
        dist = math.sqrt(sum((a - b) ** 2 for a, b in zip(query_vector, item["embedding"])))
        results.append({
            "id": item["id"],
            "content": item["content"],
            "distance": round(dist, 4)
        })
    results.sort(key=lambda x: x["distance"])
    return results[:limit]