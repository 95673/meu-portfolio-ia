export async function POST(req) {
  try {
    const { message } = await req.json();
    
    // Procura a chave tentando os dois nomes mais comuns na Vercel
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_AI_API_KEY;

    if (!apiKey) {
      return Response.json({ text: 'Erro: A chave API não foi encontrada nas variáveis da Vercel.' });
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }]
        })
      }
    );

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Erro ao gerar resposta do Gemini.';

    return Response.json({ text });
  } catch (error) {
    return Response.json({ text: 'Erro interno ao processar a resposta.' });
  }
}
