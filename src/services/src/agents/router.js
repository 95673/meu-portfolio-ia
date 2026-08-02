// src/agents/router.js
import { callAIModel } from '../services/ai-provider';

// Prompts base de cada agente especializado
const SYSTEM_PROMPTS = {
  coder: "Você é o Agente Programador de Dinostrato EB. Ajude com código limpo, debug e suporte em Python, JS, HTML, CSS, C e SQL.",
  financial: "Você é o Agente Financeiro de Dinostrato EB. Ajude a organizar despesas, receitas e relatórios de investimentos.",
  tutor: "Você é o Agente de Estudos de Dinostrato EB. Crie resumos, quizzes e explicações claras.",
  content: "Você é o Agente Gestor de Conteúdo de Dinostrato EB. Ajude a criar posts, anúncios e planejar redes sociais.",
  default: "Você é o Assistente Pessoal de Dinostrato EB. Seja atencioso, direto e eficiente."
};

export async function processAgentMessage(userMessage, agentType = 'default') {
  const prompt = SYSTEM_PROMPTS[agentType] || SYSTEM_PROMPTS.default;
  return await callAIModel(prompt, userMessage);
}
