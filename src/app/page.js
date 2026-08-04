'use client';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('User Profile');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      const data = await res.json();
      const aiMsg = { sender: 'ai', text: data.text || data.error || 'Sem resposta.' };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'ai', text: 'Erro ao ligar ao servidor.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#121316', color: '#e1e1e6', fontFamily: 'sans-serif' }}>
      
      {/* Sidebar Lateral */}
      <aside style={{ width: '260px', backgroundColor: '#1a1c23', padding: '20px', borderRight: '1px solid #2d313e', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#0070f3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>
            DE
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', color: '#fff' }}>Dinostrato EB</h3>
            <span style={{ fontSize: '12px', color: '#8d8d99' }}>Software & AI Architect</span>
          </div>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '15px' }}>
          {['User Profile', 'Portfólio', 'Project', 'Camino de Fluxo', 'Organização', 'Personalizados', 'Settings'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              style={{
                textAlign: 'left',
                padding: '10px 14px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: activeTab === item ? '#2d313e' : 'transparent',
                color: activeTab === item ? '#fff' : '#8d8d99',
                cursor: 'pointer',
                fontWeight: activeTab === item ? '600' : 'normal'
              }}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Área Principal de Conteúdo */}
      <main style={{ flex: 1, padding: '30px', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '14px', color: '#8d8d99' }}>← Back</span>
          <h1 style={{ fontSize: '24px', margin: '10px 0 20px 0', color: '#fff' }}>
            Etapa 2 — ARQUITETURA DO SISTEMA
          </h1>

          {/* Diagrama da Arquitetura */}
          <div style={{ backgroundColor: '#1a1c23', padding: '20px', borderRadius: '12px', border: '1px solid #2d313e', marginBottom: '25px' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#e1e1e6' }}>Arquitetura de fluxo diagram</h3>
            <div style={{ backgroundColor: '#eef2f5', padding: '25px', borderRadius: '8px', textAlign: 'center', color: '#333' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                <div style={{ border: '1px solid #ccc', padding: '10px 15px', borderRadius: '6px', background: '#fff' }}>Usuário</div>
                <span>➔</span>
                <div style={{ border: '1px dotted #666', padding: '10px 15px', borderRadius: '6px', background: '#fff' }}>Roteador</div>
                <span>➔</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ border: '1px solid #999', padding: '6px 12px', borderRadius: '6px', background: '#fff' }}>Agente 1</div>
                  <div style={{ border: '1px solid #999', padding: '6px 12px', borderRadius: '6px', background: '#fff' }}>Agente 2</div>
                  <div style={{ border: '1px solid #999', padding: '6px 12px', borderRadius: '6px', background: '#fff' }}>Agente 3</div>
                </div>
                <span>➔</span>
                <div style={{ border: '1px solid #0070f3', padding: '10px 15px', borderRadius: '6px', background: '#fff' }}>DB (Supabase)</div>
              </div>
            </div>
          </div>

          {/* Resumo do Fluxo */}
          <div style={{ backgroundColor: '#1a1c23', padding: '20px', borderRadius: '12px', border: '1px solid #2d313e', marginBottom: '25px' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#e1e1e6' }}>Resumo do Fluxo</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #2d313e' }}>
                  <td style={{ padding: '10px', color: '#8d8d99', width: '30%' }}>Usuário</td>
                  <td style={{ padding: '10px', color: '#fff' }}>Usuário & AI Architect</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #2d313e' }}>
                  <td style={{ padding: '10px', color: '#8d8d99' }}>Roteador</td>
                  <td style={{ padding: '10px', color: '#fff' }}>Roteador do módulo usuário</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #2d313e' }}>
                  <td style={{ padding: '10px', color: '#8d8d99' }}>Agentes</td>
                  <td style={{ padding: '10px', color: '#fff' }}>Agentes, Finanças, Perfil, etc.</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px', color: '#8d8d99' }}>Ações Externas</td>
                  <td style={{ padding: '10px', color: '#fff' }}>Supabase / Gemini AI API</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Histórico de Chat */}
          {messages.length > 0 && (
            <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    backgroundColor: msg.sender === 'user' ? '#0070f3' : '#2d313e',
                    color: '#fff',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    maxWidth: '80%'
                  }}
                >
                  {msg.text}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Caixas de Interação do Fundo */}
        <div style={{ backgroundColor: '#1a1c23', padding: '15px', borderRadius: '12px', border: '1px solid #2d313e' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#8d8d99' }}>
            O formato da arquitetura ficou claro? Podemos avançar para a Organização (Etapa 3)?
          </p>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <button
              onClick={() => handleSend('Sim, ficou claro! Podemos avançar.')}
              style={{ padding: '8px 16px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
            >
              Sim
            </button>
            <button
              onClick={() => handleSend('Preciso de ajustes na arquitetura.')}
              style={{ padding: '8px 16px', backgroundColor: '#2d313e', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}
            >
              Preciso de Ajustes
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escreva a mensagem..."
              style={{ flex: 1, padding: '12px', borderRadius: '8px', backgroundColor: '#121316', border: '1px solid #2d313e', color: '#fff' }}
            />
            <button
              onClick={() => handleSend()}
              disabled={loading}
              style={{ padding: '12px 20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              {loading ? '...' : '➔'}
            </button>
          </div>
        </div>

      </main>
    </div>
  );
            }
