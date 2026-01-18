
import React, { useState } from 'react';
import { SHOP_CONFIGS } from '../constants';
import { DailyLog } from '../types';

interface DataUploadProps {
  onUpload?: (logs: DailyLog[]) => void;
}

const DataUpload: React.FC<DataUploadProps> = ({ onUpload }) => {
  const [data, setData] = useState('');

  const handleDownloadTemplate = () => {
    const headers = ['日期', ...SHOP_CONFIGS.map(s => s.name)].join(',');
    const now = new Date();
    const dateStr = `${now.getMonth() + 1}/${now.getDate().toString().padStart(2, '0')}`;
    const sampleRow = [dateStr, ...SHOP_CONFIGS.map(() => '0.00')].join(',');
    const csvContent = headers + '\n' + sampleRow;
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Etsy_Template.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    // 简化的解析逻辑示例（实际应用中应使用更复杂的 CSV 解析器）
    if (!data.trim()) return;
    alert('数据已提交解析（模拟）。在正式版本中，这将实时更新大盘图表。');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <i className="fa-solid fa-cloud-arrow-up text-orange-500"></i>
          经营数据批量录入
        </h3>
        <p className="text-slate-500 text-sm mb-6">
          您可以直接粘贴 Excel 中的数据，系统将自动解析。格式必须包含“日期”列。
        </p>
        
        <div className="space-y-4">
          <textarea 
            className="w-full h-64 p-4 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
            placeholder={`日期,${SHOP_CONFIGS[0]?.name || '店铺A'},${SHOP_CONFIGS[1]?.name || '店铺B'}...\n1/01,120.50,300.00...`}
            value={data}
            onChange={(e) => setData(e.target.value)}
          ></textarea>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={handleDownloadTemplate}
              className="px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-bold hover:bg-slate-700 transition-colors flex items-center gap-2"
            >
              <i className="fa-solid fa-file-csv"></i> 下载模版
            </button>
            <button 
              onClick={handleImport}
              className="px-8 py-2.5 bg-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-100 hover:bg-orange-700 transition-all"
            >
              提交并更新大盘
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataUpload;
