// src/services/ai-provider.js
// Função simples e limpa para conectar a qualquer modelo de IA

export async function callAIModel(systemPrompt, userPrompt) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_AI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Erro na comunicação com a IA:", error);
    return "Desculpe, ocorreu um erro ao processar a resposta.";
  }
}
