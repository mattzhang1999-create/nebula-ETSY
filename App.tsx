
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import DailyTracker from './components/DailyTracker';
import DataUpload from './components/DataUpload';
import Analytics from './components/Analytics';
import ShopInfo from './components/ShopInfo';
import Login from './components/Login';
import { ViewType, ShopDetail, DailyLog, MonthlyAdSpend } from './types';
import { 
  SHOP_DETAILS as INITIAL_SHOP_DETAILS, 
  MOCK_DAILY_LOGS as INITIAL_LOGS,
  MOCK_AD_SPEND as INITIAL_AD_SPEND
} from './constants';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ViewType>('tracker');
  
  // 核心数据状态化，确保子组件同步
  const [shopDetails, setShopDetails] = useState<ShopDetail[]>(() => {
    const saved = localStorage.getItem('etsy_pro_shops');
    return saved ? JSON.parse(saved) : INITIAL_SHOP_DETAILS;
  });

  const [dailyLogs, setDailyLogs] = useState<DailyLog[]>(() => {
    const saved = localStorage.getItem('etsy_pro_logs');
    return saved ? JSON.parse(saved) : INITIAL_LOGS;
  });

  const [adSpend, setAdSpend] = useState<MonthlyAdSpend[]>(() => {
    const saved = localStorage.getItem('etsy_pro_ad_spend');
    return saved ? JSON.parse(saved) : INITIAL_AD_SPEND;
  });

  // 持久化保存数据
  useEffect(() => {
    localStorage.setItem('etsy_pro_shops', JSON.stringify(shopDetails));
    localStorage.setItem('etsy_pro_logs', JSON.stringify(dailyLogs));
    localStorage.setItem('etsy_pro_ad_spend', JSON.stringify(adSpend));
  }, [shopDetails, dailyLogs, adSpend]);

  const handleUpdateShops = (updatedShops: ShopDetail[]) => {
    setShopDetails(updatedShops);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'tracker':
        return <DailyTracker shops={shopDetails} logs={dailyLogs} adSpend={adSpend} />;
      case 'upload':
        return <DataUpload onUpload={(newLogs) => setDailyLogs(newLogs)} />;
      case 'analytics':
        return <Analytics />;
      case 'shops':
        return <ShopInfo shops={shopDetails} onUpdateShops={handleUpdateShops} />;
      case 'settings':
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
              <i className="fa-solid fa-share-nodes text-4xl mb-4 text-orange-500"></i>
              <h3 className="text-xl font-bold text-slate-800">系统数据共享</h3>
              <p className="text-slate-500 mb-8 max-w-md mx-auto">
                目前的系统运行在本地环境。你可以导出当前的完整配置文件，发送给你的伙伴，他们在“导入配置”中上传即可同步你的所有店铺设置。
              </p>
              <div className="flex justify-center gap-4">
                <button 
                  onClick={() => {
                    const backup = { shopDetails, dailyLogs, adSpend };
                    const blob = new Blob([JSON.stringify(backup)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `Etsy_Pro_Backup_${new Date().toISOString().slice(0,10)}.json`;
                    a.click();
                  }}
                  className="px-6 py-3 bg-slate-800 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-slate-700"
                >
                  <i className="fa-solid fa-download"></i> 导出完整共享包
                </button>
              </div>
            </div>
            
            <div className="p-8 bg-rose-50 rounded-3xl border border-rose-100">
               <h4 className="font-bold text-rose-800 flex items-center gap-2 mb-2">
                 <i className="fa-solid fa-triangle-exclamation"></i> 退出登录
               </h4>
               <p className="text-sm text-rose-700 mb-4">退出后将清除本次会话。管理密码: 888888</p>
               <button onClick={handleLogout} className="px-4 py-2 bg-rose-600 text-white rounded-xl text-sm font-bold hover:bg-rose-700">安全退出系统</button>
            </div>
          </div>
        );
      default:
        return <DailyTracker shops={shopDetails} logs={dailyLogs} adSpend={adSpend} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar currentView={currentView} setView={(v) => setCurrentView(v as ViewType)} />
      
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                {currentView === 'tracker' ? '每日营业明细大盘' : 
                 currentView === 'upload' ? '数据导入中心' : 
                 currentView === 'analytics' ? 'AI 盈利分析' : 
                 currentView === 'shops' ? '店铺信息档案' : '共享与设置'}
              </h2>
              <p className="text-sm font-medium text-slate-400">
                最后更新: {new Date().toLocaleTimeString()}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/${i+20}/32/32`} className="w-8 h-8 rounded-full border-2 border-white" alt="User" />
                ))}
                <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-orange-600">云</div>
              </div>
              <button 
                onClick={() => setCurrentView('upload')}
                className="bg-orange-600 text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-100"
              >
                <i className="fa-solid fa-plus"></i>
                录入数据
              </button>
            </div>
          </div>

          {renderContent()}
        </div>
      </main>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slideUp { animation: slideUp 0.4s ease-out; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { bg: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};

export default App;
