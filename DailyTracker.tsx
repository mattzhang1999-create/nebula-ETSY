
import React from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell, PieChart, Pie, BarChart, Bar
} from 'recharts';
import { ShopDetail, DailyLog, MonthlyAdSpend } from '../types';

interface DailyTrackerProps {
  shops: ShopDetail[];
  logs: DailyLog[];
  adSpend: MonthlyAdSpend[];
}

const DailyTracker: React.FC<DailyTrackerProps> = ({ shops, logs, adSpend }) => {
  // --- 数据处理逻辑 ---
  const daysCount = logs.length || 1;
  const shopsCount = shops.length || 1;

  // 计算每日总计用于趋势图
  const trendData = logs.map(log => ({
    date: log.date,
    revenue: Number(Object.values(log.shopData).reduce((sum, d) => sum + d.revenue, 0).toFixed(2))
  }));

  // 1. 全店周期总营收 (累加所有日志中所有店铺的营业额)
  const totalPeriodRevenue = Number(trendData.reduce((sum, d) => sum + d.revenue, 0).toFixed(2));
  
  // 2. 全店日均营收 (总营收 / 天数)
  const avgDailyTotalRevenue = Number((totalPeriodRevenue / daysCount).toFixed(2));

  // 3. 单店平均月收 (总营收 / 店铺总数) - 这里修正了逻辑
  const avgShopMonthlyRevenue = Number((totalPeriodRevenue / shopsCount).toFixed(2));

  // 产品线汇总
  const categoryMap: Record<string, number> = {};
  shops.forEach(shop => {
    const shopTotal = logs.reduce((sum, log) => sum + (log.shopData[shop.id]?.revenue || 0), 0);
    categoryMap[shop.category] = (categoryMap[shop.category] || 0) + shopTotal;
  });

  const categoryData = Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value: Number(value.toFixed(2)) }))
    .sort((a, b) => b.value - a.value);

  // 广告费汇总
  const totalAdSpend = Number(adSpend.reduce((sum, a) => sum + a.amount, 0).toFixed(2));
  const avgAdRatio = totalPeriodRevenue > 0 ? (totalAdSpend / totalPeriodRevenue) * 100 : 0;
  
  const latestLog = logs[logs.length - 1];
  const todayRevenue = latestLog ? Number(Object.values(latestLog.shopData).reduce((sum, d) => sum + d.revenue, 0).toFixed(2)) : 0;

  const COLORS = ['#ea580c', '#f97316', '#fb923c', '#fdba74', '#fed7aa', '#ffedd5', '#94a3b8', '#cbd5e1', '#334155', '#475569'];

  const getShopMonthlyTotal = (shopId: string) => {
    return Number(logs.reduce((sum, log) => sum + (log.shopData[shopId]?.revenue || 0), 0).toFixed(2));
  };

  const getAdSpendVal = (shopId: string) => {
    return Number((adSpend.find(a => a.shopId === shopId)?.amount || 0).toFixed(2));
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* 1. 核心指标看板 - 修正计算展示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 bg-orange-100 text-orange-600 rounded-xl"><i className="fa-solid fa-calendar-day"></i></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">实时流量</span>
            </div>
            <h3 className="text-sm font-bold text-slate-500">最新单日总营收</h3>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-slate-800">${todayRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <p className="text-xs text-slate-400 font-bold mt-1">更新日期: {latestLog?.date || 'N/A'}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 bg-blue-100 text-blue-600 rounded-xl"><i className="fa-solid fa-chart-line"></i></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">经营周期</span>
            </div>
            <h3 className="text-sm font-bold text-slate-500">全店日均营收</h3>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-slate-800">${avgDailyTotalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <p className="text-xs text-slate-400 font-bold mt-1">基于 {daysCount} 天统计数据</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 bg-purple-100 text-purple-600 rounded-xl"><i className="fa-solid fa-store"></i></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">店铺均衡</span>
            </div>
            <h3 className="text-sm font-bold text-slate-500">单店平均月收</h3>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-slate-800">${avgShopMonthlyRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <p className="text-xs text-slate-400 font-bold mt-1">总营收 ÷ {shopsCount} 家店</p>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-3xl shadow-xl shadow-slate-200 flex flex-col justify-between text-white transition-transform hover:-translate-y-1">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="p-2 bg-slate-700 text-orange-400 rounded-xl"><i className="fa-solid fa-wallet"></i></span>
              <span className="text-[10px] font-bold text-slate-500 uppercase">周期累计</span>
            </div>
            <h3 className="text-sm font-bold text-slate-400">总营收合计</h3>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-black text-orange-400">${totalPeriodRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <p className="text-xs text-slate-400 font-bold mt-1">广告总额 ${totalAdSpend.toLocaleString()} ({avgAdRatio.toFixed(1)}%)</p>
          </div>
        </div>
      </div>

      {/* 2. 图表可视化区 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <i className="fa-solid fa-wave-square text-orange-500"></i>
              全店总营收走势 (USD)
            </h4>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}} 
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px'}}
                  labelStyle={{fontWeight: 'bold', marginBottom: '4px'}}
                  formatter={(value: any) => [`$${Number(value).toFixed(2)}`, '销售额']}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  name="当日销售额"
                  stroke="#ea580c" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h4 className="text-lg font-bold text-slate-800 mb-8 flex items-center gap-2">
            <i className="fa-solid fa-layer-group text-orange-500"></i>
            产品线份额分布
          </h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(val: any) => `$${Number(val).toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. 详细经营矩阵表格 */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold text-slate-800">经营明细矩阵 (实时同步)</h4>
            <p className="text-xs text-slate-400 font-medium">当前计算基于 {shopsCount} 家店，共计 {daysCount} 天经营记录。</p>
          </div>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-[11px] text-center border-collapse min-w-[1800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                <th className="p-4 border-r border-slate-100 sticky left-0 bg-slate-50 z-20 w-28 shadow-[2px_0_5px_rgba(0,0,0,0.05)]">日期</th>
                {shops.map(shop => (
                  <th key={shop.id} className="p-4 border-r border-slate-100 min-w-[100px]">
                    <div className="text-slate-800 truncate">{shop.name}</div>
                    <div className="text-[9px] text-slate-400 font-medium normal-case truncate">{shop.category}</div>
                  </th>
                ))}
                <th className="p-4 bg-orange-50 font-black text-orange-800 sticky right-0 z-20 w-32 shadow-[-2px_0_5px_rgba(0,0,0,0.05)]">当日总计</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.map((log, idx) => {
                const dailyTotal = Number(Object.values(log.shopData).reduce((sum, d) => sum + d.revenue, 0).toFixed(2));
                return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4 border-r border-slate-100 sticky left-0 bg-white group-hover:bg-slate-50 font-bold text-slate-500 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.05)] text-xs">
                      {log.date}
                    </td>
                    {shops.map(shop => {
                      const rev = log.shopData[shop.id]?.revenue || 0;
                      return (
                        <td key={shop.id} className={`p-4 border-r border-slate-100 font-mono ${rev < 0 ? 'text-rose-500 font-black' : rev > 300 ? 'text-emerald-600 font-bold' : 'text-slate-600'}`}>
                          {rev !== 0 ? rev.toFixed(2) : '—'}
                        </td>
                      );
                    })}
                    <td className="p-4 bg-orange-50 font-black text-slate-800 sticky right-0 z-10 shadow-[-2px_0_5px_rgba(0,0,0,0.05)]">
                      ${dailyTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot className="bg-slate-800 text-white font-bold border-t border-slate-700">
              <tr>
                <td className="p-4 border-r border-slate-700 sticky left-0 bg-slate-800 z-10 shadow-[2px_0_5px_rgba(0,0,0,0.1)]">月度合计</td>
                {shops.map(shop => (
                  <td key={shop.id} className="p-4 border-r border-slate-700 text-orange-300 font-mono">
                    {getShopMonthlyTotal(shop.id).toFixed(2)}
                  </td>
                ))}
                <td className="p-4 bg-orange-600 text-white font-black text-xs sticky right-0 z-10 shadow-[-2px_0_5px_rgba(0,0,0,0.1)]">
                  ${totalPeriodRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
              <tr className="bg-slate-900">
                <td className="p-4 border-r border-slate-800 sticky left-0 bg-slate-900 z-10">广告占比</td>
                {shops.map(shop => {
                  const rev = getShopMonthlyTotal(shop.id);
                  const ads = getAdSpendVal(shop.id);
                  const ratio = rev > 0 ? (ads / rev) * 100 : 0;
                  return (
                    <td key={shop.id} className={`p-4 border-r border-slate-800 font-mono text-[9px] ${ratio > 30 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {ratio.toFixed(2)}%
                    </td>
                  );
                })}
                <td className="p-4 bg-slate-950 text-slate-400 text-[10px] sticky right-0 z-10">
                   ACOS: {avgAdRatio.toFixed(1)}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DailyTracker;
