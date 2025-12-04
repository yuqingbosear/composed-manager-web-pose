import { useState, useEffect } from 'react';
import apiClient from './api/client';
import { Workflow, WorkflowCreate } from './types/workflow';

function App() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newWf, setNewWf] = useState<WorkflowCreate>({ name: '' });

  const fetchWorkflows = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.get<Workflow[]>('/workflows');
      setWorkflows(res.data);
    } catch (err) {
      setError('加载失败');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newWf.name.trim()) return;
    try {
      await apiClient.post('/workflows', newWf);
      fetchWorkflows();
      setNewWf({ name: '' });
    } catch (err) {
      // 错误已在拦截器处理
    }
  };

  const handleSearch = async () => {
    const query = [0.1, 0.2, 0.3, 0.4]; // 模拟查询向量
    try {
      const res = await apiClient.post('/search', { query_vector: query, limit: 3 });
      alert('搜索结果:\n' + JSON.stringify(res.data, null, 2));
    } catch (err) {
      // 错误已在拦截器处理
    }
  };

  useEffect(() => {
    fetchWorkflows();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>📋 工作流管理系统</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="输入工作流名称"
          value={newWf.name}
          onChange={(e) => setNewWf({ ...newWf, name: e.target.value })}
          style={{ padding: '8px', marginRight: '8px', width: '200px' }}
        />
        <button onClick={handleCreate} disabled={!newWf.name.trim()}>
          添加工作流
        </button>
        <button onClick={handleSearch} style={{ marginLeft: '10px' }}>
          向量搜索测试
        </button>
      </div>

      {loading && <p>🔄 加载中...</p>}
      {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {workflows.map((wf) => (
          <li key={wf.id} style={{ padding: '8px', borderBottom: '1px solid #eee' }}>
            <strong>{wf.name}</strong>
            {wf.description && <span> - {wf.description}</span>}
          </li>
        ))}
      </ul>

      {workflows.length === 0 && !loading && <p>暂无工作流</p>}
    </div>
  );
}

export default App;