# Arquitetura — Meu Portfólio IA

## Visão geral
- **Frontend**: HTML/CSS/JS puro, hospedado no Vercel
- **Backend**: Node.js + Express, hospedado no Render
- **IA**: Groq API (llama-3.3-70b-versatile), mesma usada no SaúdeBot
- **Base de dados**: em memória para já (config/db.js) — fácil de trocar depois por MongoDB/Firebase

## Como corrigir um erro
1. Identifica o módulo (chat, financeiro, agenda)
2. Vê a **rota** em `routes/` — confirma que o caminho está certo
3. Vê o **controller** em `controllers/` — é aqui que está a lógica
4. Se o erro for de IA, vê o **agente** em `agents/`
5. Testa sempre uma peça de cada vez

## Como adicionar um novo módulo (ex: "estudos")
1. Cria `routes/estudos.js`
2. Cria `controllers/estudosController.js`
3. Cria `agents/estudos.js` (se precisar de IA)
4. Liga a rota nova em `server.js`
