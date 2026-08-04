export async function POST(req) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_AI_API_KEY;

    if (!apiKey) {
      return Response.json({ error: 'Chave API não configurada.' }, { status: 500 });
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }]
        })
      }
    );

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Erro ao obter resposta da IA.';

    return Response.json({ text });
  } catch (error) {
    return Response.json({ error: 'Erro interno no servidor.' }, { status: 500 });
  }
}
