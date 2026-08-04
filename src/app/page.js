'use client';
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponse('A pensar...');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      setResponse(data.text || data.error || 'Sem resposta.');
    } catch (err) {
      setResponse('Erro ao ligar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#0070f3' }}>Portfólio IA 🤖</h1>
      <p>O seu assistente inteligente está pronto para conversar!</p>

      <div style={{ marginTop: '20px' }}>
        <textarea
          rows="4"
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            boxSizing: 'border-box'
          }}
          placeholder="Escreva a sua mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          style={{
            marginTop: '10px',
            width: '100%',
            padding: '12px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'A enviar...' : 'Enviar para a IA'}
        </button>
      </div>

      {response && (
        <div
          style={{
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            border: '1px solid #e0e0e0'
          }}
        >
          <strong>Resposta:</strong>
          <p style={{ whiteSpace: 'pre-wrap', marginTop: '8px' }}>{response}</p>
        </div>
      )}
    </main>
  );
            }
