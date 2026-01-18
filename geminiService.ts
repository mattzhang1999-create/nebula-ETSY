
import { GoogleGenAI } from "@google/genai";
import { Shop, DailyMetric } from "../types";

// Analyze shop performance using Gemini API
export async function analyzeShopPerformance(shops: Shop[], stats: DailyMetric[]) {
  // Use named parameter and direct process.env.API_KEY as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const shopDataString = JSON.stringify(shops.map(s => ({
    name: s.name,
    revenue: s.revenue,
    conversion: s.conversionRate,
    status: s.status
  })));

  const statsDataString = JSON.stringify(stats);

  const prompt = `
    作为一名资深的 Etsy 业务分析专家，请分析我的多店铺运营数据。
    店铺数据: ${shopDataString}
    近期增长趋势: ${statsDataString}
    
    请提供：
    1. 整体运营表现的简明执行摘要。
    2. 识别表现最好的店铺并分析原因。
    3. 针对提高转化率或营业额的三个具体且可操作的建议。
    4. 如果有任何店铺指标看起来令人担忧（例如：高访问量但低转化率），请发出警告或提醒。
    
    请使用专业、客观的中文回复。
  `;

  try {
    // Using gemini-3-pro-preview for complex reasoning task (business analysis)
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });
    // Access .text property directly (do not call as a function)
    return response.text;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return "生成业务洞察失败。请稍后再试。";
  }
}
