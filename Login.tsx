
import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 这里设置简单的访问控制，你可以告诉你的伙伴密码是 888888
    if (password === '888888') {
      onLoginSuccess();
    } else {
      setError('密码错误，请联系系统管理员获取访问权限。');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* 装饰背景 */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md animate-slideUp relative z-10">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-4xl shadow-2xl shadow-orange-900/40 mx-auto mb-6">
            <i className="fa-solid fa-chart-line"></i>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter mb-2">ETSY PRO</h1>
          <p className="text-slate-400 font-medium">多店铺经营管理数据中台</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[40px] border border-white/10 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">访问密码</label>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
                <input 
                  autoFocus
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入 6 位管理密码"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs py-3 px-4 rounded-xl flex items-center gap-2 animate-fadeIn">
                <i className="fa-solid fa-circle-exclamation"></i>
                {error}
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-900/20 transition-all transform active:scale-95"
            >
              登录系统
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              内部系统 · 严禁泄露数据
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
