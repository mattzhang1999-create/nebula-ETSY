
import React from 'react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'tracker', label: '经营大盘', icon: 'fa-table' },
    { id: 'shops', label: '店铺档案', icon: 'fa-address-card' }, // 新增的店铺信息入口
    { id: 'upload', label: '上传数据', icon: 'fa-cloud-arrow-up' },
    { id: 'analytics', label: 'AI 分析报告', icon: 'fa-wand-magic-sparkles' },
    { id: 'settings', label: '系统设置', icon: 'fa-sliders' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col z-20">
      <div className="p-6">
        <div className="flex items-center gap-3 text-orange-600">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
            <i className="fa-solid fa-chart-simple text-xl"></i>
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter text-slate-800 leading-none">ETSY PRO</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Analytics Tool</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as ViewType)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              currentView === item.id 
                ? 'bg-orange-50 text-orange-600 shadow-sm shadow-orange-100 font-bold' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg`}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
            JD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-slate-700 truncate">店铺管理员</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Enterprise</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
