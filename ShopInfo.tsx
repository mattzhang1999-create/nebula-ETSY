
import React, { useState, useRef, useMemo } from 'react';
import { ShopDetail } from '../types';

interface ShopInfoProps {
  shops: ShopDetail[];
  onUpdateShops: (shops: ShopDetail[]) => void;
}

type SortField = 'name' | 'country' | 'category' | 'registrantName';
type SortOrder = 'asc' | 'desc' | null;

const ShopInfo: React.FC<ShopInfoProps> = ({ shops, onUpdateShops }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShop, setEditingShop] = useState<ShopDetail | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 排序状态
  const [sortConfig, setSortConfig] = useState<{ field: SortField; order: SortOrder }>({
    field: 'name',
    order: null
  });

  const [formData, setFormData] = useState<Partial<ShopDetail>>({
    name: '',
    country: '美国',
    category: '',
    realShopName: '',
    todeskId: '',
    pcPin: '',
    registrantName: '',
    email: '',
    emailPassword: '',
    owner: '',
    logo: ''
  });

  const handleSort = (field: SortField) => {
    let order: SortOrder = 'asc';
    if (sortConfig.field === field && sortConfig.order === 'asc') {
      order = 'desc';
    } else if (sortConfig.field === field && sortConfig.order === 'desc') {
      order = null;
    }
    setSortConfig({ field, order });
  };

  const togglePassword = (id: string) => {
    setShowPasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddModal = () => {
    setEditingShop(null);
    setFormData({
      name: '',
      country: '美国',
      category: '',
      realShopName: '',
      todeskId: '',
      pcPin: '',
      registrantName: '',
      email: '',
      emailPassword: '',
      owner: '',
      logo: ''
    });
    setIsModalOpen(true);
  };

  const openEditModal = (shop: ShopDetail) => {
    setEditingShop(shop);
    setFormData({ ...shop });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('确定要删除这家店铺的信息吗？')) {
      onUpdateShops(shops.filter(s => s.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingShop) {
      onUpdateShops(shops.map(s => s.id === editingShop.id ? (formData as ShopDetail) : s));
    } else {
      const newShop = {
        ...formData,
        id: `s-${Date.now()}`
      } as ShopDetail;
      onUpdateShops([...shops, newShop]);
    }
    setIsModalOpen(false);
  };

  // 使用 useMemo 处理过滤和排序逻辑
  const processedShops = useMemo(() => {
    let result = shops.filter(shop => 
      shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (shop.realShopName && shop.realShopName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      shop.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.order) {
      result = [...result].sort((a, b) => {
        const valA = (a[sortConfig.field] || '').toString().toLowerCase();
        const valB = (b[sortConfig.field] || '').toString().toLowerCase();
        
        if (valA < valB) return sortConfig.order === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.order === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [shops, searchTerm, sortConfig]);

  const renderSortIcon = (field: SortField) => {
    if (sortConfig.field !== field || !sortConfig.order) {
      return <i className="fa-solid fa-sort ml-1 text-slate-300"></i>;
    }
    return sortConfig.order === 'asc' 
      ? <i className="fa-solid fa-sort-up ml-1 text-orange-500"></i> 
      : <i className="fa-solid fa-sort-down ml-1 text-orange-500"></i>;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">店铺注册与配置信息</h2>
          <p className="text-sm text-slate-500">管理店铺的国家、类目、远程桌面及账号凭据。</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input 
              type="text" 
              placeholder="搜索店铺、名字或邮箱..."
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm w-64 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={openAddModal}
            className="bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-700 transition-all"
          >
            <i className="fa-solid fa-plus-circle"></i>
            添加店铺
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <th 
                  className="p-4 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  店铺序号 {renderSortIcon('name')}
                </th>
                <th 
                  className="p-4 text-center cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('country')}
                >
                  国家 {renderSortIcon('country')}
                </th>
                <th 
                  className="p-4 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('category')}
                >
                  类目 {renderSortIcon('category')}
                </th>
                <th className="p-4">店铺名字</th>
                <th className="p-4">ToDesk ID</th>
                <th className="p-4">电脑PIN码</th>
                <th 
                  className="p-4 cursor-pointer hover:bg-slate-100 transition-colors"
                  onClick={() => handleSort('registrantName')}
                >
                  注册人 {renderSortIcon('registrantName')}
                </th>
                <th className="p-4">邮箱账号</th>
                <th className="p-4">邮箱密码</th>
                <th className="p-4 text-center">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {processedShops.map((shop) => (
                <tr key={shop.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4 font-bold text-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 shrink-0">
                        {shop.logo ? (
                          <img src={shop.logo} alt={shop.name} className="w-full h-full object-cover" />
                        ) : (
                          <i className="fa-solid fa-store text-slate-400 text-[10px]"></i>
                        )}
                      </div>
                      <span>{shop.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold">{shop.country}</span>
                  </td>
                  <td className="p-4 text-slate-600">{shop.category}</td>
                  <td className="p-4 font-medium text-blue-600">{shop.realShopName}</td>
                  <td className="p-4 font-mono text-slate-500">{shop.todeskId}</td>
                  <td className="p-4 font-mono text-slate-500">{shop.pcPin}</td>
                  <td className="p-4 text-slate-700">{shop.registrantName}</td>
                  <td className="p-4 text-blue-500 hover:underline cursor-pointer">{shop.email}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-500">
                        {showPasswords[shop.id] ? shop.emailPassword || '—' : '••••••••'}
                      </span>
                      {shop.emailPassword && (
                        <button 
                          onClick={() => togglePassword(shop.id)}
                          className="text-slate-400 hover:text-slate-600"
                        >
                          <i className={`fa-solid ${showPasswords[shop.id] ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openEditModal(shop)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="编辑"
                      >
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button 
                        onClick={() => handleDelete(shop.id)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="删除"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {processedShops.length === 0 && (
                <tr>
                  <td colSpan={10} className="p-12 text-center text-slate-400">
                    <i className="fa-solid fa-magnifying-glass text-3xl mb-3 block opacity-20"></i>
                    未找到匹配的店铺记录
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp">
            <div className="sticky top-0 px-8 py-6 bg-slate-50 border-b border-slate-100 flex justify-between items-center z-10">
              <h3 className="text-xl font-bold text-slate-800">
                {editingShop ? '编辑店铺信息' : '录入新店铺数据'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8">
              <div className="mb-8 flex flex-col items-center">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-24 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all overflow-hidden group"
                >
                  {formData.logo ? (
                    <img src={formData.logo} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <i className="fa-solid fa-image text-slate-300 text-2xl mb-1 group-hover:text-orange-400"></i>
                      <span className="text-[10px] text-slate-400 font-bold uppercase group-hover:text-orange-600">上传 Logo</span>
                    </>
                  )}
                </div>
                {formData.logo && (
                  <button 
                    type="button" 
                    onClick={() => setFormData(prev => ({ ...prev, logo: '' }))}
                    className="mt-2 text-[10px] text-rose-500 font-bold hover:underline"
                  >
                    删除图片
                  </button>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">店铺序号 (如：首饰1)</label>
                  <input 
                    required
                    type="text"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">注册人国家</label>
                  <select 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                  >
                    <option>美国</option>
                    <option>澳大利亚</option>
                    <option>新西兰</option>
                    <option>德国</option>
                    <option>英国</option>
                    <option>中国</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">类目</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">店铺名字 (Real Name)</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
                    value={formData.realShopName}
                    onChange={(e) => setFormData({...formData, realShopName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">ToDesk ID</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
                    value={formData.todeskId}
                    onChange={(e) => setFormData({...formData, todeskId: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">电脑 PIN 码</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
                    value={formData.pcPin}
                    onChange={(e) => setFormData({...formData, pcPin: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">注册人名字</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
                    value={formData.registrantName}
                    onChange={(e) => setFormData({...formData, registrantName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">负责人</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
                    value={formData.owner}
                    onChange={(e) => setFormData({...formData, owner: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">邮箱账号</label>
                  <input 
                    type="email"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">邮箱密码</label>
                  <input 
                    type="text"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
                    value={formData.emailPassword}
                    onChange={(e) => setFormData({...formData, emailPassword: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="mt-10 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-colors"
                >
                  取消
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-2xl font-bold shadow-lg shadow-orange-100 hover:bg-orange-700 transition-all"
                >
                  {editingShop ? '保存更改' : '确认录入'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex gap-3 items-start">
        <i className="fa-solid fa-shield-halved text-orange-500 mt-1"></i>
        <div className="text-xs text-orange-800">
          <p className="font-bold mb-1">安全提示</p>
          <p>此处包含敏感的注册及登录信息，仅供管理层查阅。请勿将此页面截图分享给非相关人员。</p>
        </div>
      </div>
    </div>
  );
};

export default ShopInfo;
