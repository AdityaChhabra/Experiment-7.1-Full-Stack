import { useEffect, useState } from 'react';
import { api, getAxiosErrorMessage } from '../api/client';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController(); // Axios v1 supports fetch-style abort
    setLoading(true);
    setError('');

    api.get('/todos', { signal: controller.signal })
      .then(res => setTodos(res.data))
      .catch(err => {
        if (err.name !== 'CanceledError') setError(getAxiosErrorMessage(err));
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  async function addTodo(e) {
    e.preventDefault();
    if (!text.trim()) return;
    try {
      const res = await api.post('/todos', { text: text.trim() });
      setTodos(prev => [res.data, ...prev]);
      setText('');
    } catch (err) {
      setError(getAxiosErrorMessage(err));
    }
  }

  if (loading) return <p>Loading…</p>;
  return (
    <div style={{ maxWidth: 460, margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>Todos</h1>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <form onSubmit={addTodo} style={{ display: 'flex', gap: 8 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="New todo"
          style={{ flex: 1 }}
        />
        <button type="submit">Add</button>
      </form>

      <ul style={{ marginTop: 16 }}>
        {todos.map(t => (
          <li key={t.id}>
            <input type="checkbox" checked={t.done} readOnly /> {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
