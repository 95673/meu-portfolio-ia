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
      const apiKey = process.env.NEXT_PUBLIC_AI_API_KEY;
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }]
          })
        }
      );

      const data = await res.json();
      const text =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Não foi possível obter uma resposta.';
      setResponse(text);
    } catch (err) {
      setResponse('Erro ao ligar à Inteligência Artificial.');
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
