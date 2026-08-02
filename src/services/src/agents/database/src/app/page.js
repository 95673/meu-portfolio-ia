// src/app/page.js
'use client';
import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input) return;
    setLoading(true);
    setResponse('A processar resposta...');

    try {
      const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + process.env.NEXT_PUBLIC_AI_API_KEY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: input }] }]
        })
      });

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Erro ao gerar resposta.';
      setResponse(text);
    } catch (err) {
      setResponse('Erro na ligação com a IA.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Portfólio IA - Dinostrato EB</h1>
      <p>O seu assistente pessoal está online!</p>

      <div style={{ marginTop: '20px' }}>
        <textarea
          rows="4"
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
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
            fontSize: '16px'
          }}
        >
          {loading ? 'A enviar...' : 'Enviar para a IA'}
        </button>
      </div>

      {response && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
          <strong>Resposta:</strong>
          <p style={{ whiteSpace: 'pre-wrap' }}>{response}</p>
        </div>
      )}
    </main>
  );
        }
