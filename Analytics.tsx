
import React, { useState } from 'react';
import { analyzeShopPerformance } from '../services/geminiService';
import { SHOPS, DAILY_STATS } from '../constants';

const Analytics: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const generateReport = async () => {
    setLoading(true);
    const result = await analyzeShopPerformance(SHOPS, DAILY_STATS);
    setReport(result || "未能生成分析报告。");
    setLoading(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">AI 经营洞察</h2>
          <p className="text-slate-500">利用 Gemini 强大的分析能力，优化您的 Etsy 店铺绩效。</p>
        </div>
        <button 
          onClick={generateReport}
          disabled={loading}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
            loading ? 'bg-slate-200 text-slate-500 cursor-not-allowed' : 'bg-orange-600 text-white hover:bg-orange-700 shadow-orange-200'
          }`}
        >
          {loading ? (
            <i className="fa-solid fa-circle-notch fa-spin"></i>
          ) : (
            <i className="fa-solid fa-sparkles"></i>
          )}
          {loading ? '正在分析数据...' : '运行深度分析'}
        </button>
      </header>

      {!report && !loading && (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-16 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center text-3xl mb-6">
            <i className="fa-solid fa-brain"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">准备好提升业绩了吗？</h3>
          <p className="text-slate-500 max-w-md mx-auto mb-8">
            点击上方按钮，让 Gemini 分析您的流量、转化率和销售趋势。 
            获取为您量身定制的策略，提升多店总营收。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl">
            <div className="bg-slate-50 p-4 rounded-2xl text-left border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">趋势探测</p>
              <p className="text-sm text-slate-600">在需求爆发前发现热门商品潜力。</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl text-left border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">上架优化</p>
              <p className="text-sm text-slate-600">为表现不佳的商品提供 SEO 和主图建议。</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl text-left border border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">利润策略</p>
              <p className="text-sm text-slate-600">深度分析各项费用与收入，寻找真实利润点。</p>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">正在咨询 AI 业务教练...</p>
        </div>
      )}

      {report && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-slideUp">
          <div className="bg-orange-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <i className="fa-solid fa-wand-magic-sparkles text-2xl"></i>
              <h3 className="text-2xl font-bold">深度分析报告</h3>
            </div>
            <p className="text-orange-100">基于过去 30 天内 {SHOPS.length} 家店铺的运营数据生成。</p>
          </div>
          <div className="p-8 prose prose-slate max-w-none text-slate-700">
            <div className="whitespace-pre-wrap leading-relaxed font-medium text-lg">
              {report}
            </div>
          </div>
          <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-between items-center">
            <span className="text-slate-400 text-xs italic">注：以上为 AI 生成内容，重大经营决策请结合实际情况参考。</span>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">
                下载 PDF
              </button>
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50">
                分享报告
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
