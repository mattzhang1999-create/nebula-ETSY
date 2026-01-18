
import { ShopConfig, DailyLog, MonthlyAdSpend, Shop, DailyMetric, Order, ShopDetail } from './types';

// 1. 基础配置：定义 18 家店铺的 ID、名称、类目和负责人
export const SHOP_CONFIGS: ShopConfig[] = [
  { id: 's1', name: '首饰1', category: '定制首饰', owner: '洪依璇' },
  { id: 's2', name: '首饰3', category: '定制首饰', owner: '洪依璇' },
  { id: 's3', name: '首饰9', category: '定制首饰', owner: '洪依璇' },
  { id: 's4', name: '美国4', category: '天然石首饰', owner: '洪依璇' },
  { id: 's5', name: '天然石4', category: '天然石首饰', owner: '洪陪郡' },
  { id: 's6', name: '德国天然石', category: '天然石首饰', owner: '洪依璇' },
  { id: 's7', name: '阳光捕手1', category: '阳光捕手', owner: 'gina' },
  { id: 's8', name: '灯光画--阳光捕手2', category: '阳光捕手', owner: 'gina' },
  { id: 's9', name: '挂画1', category: '挂画', owner: 'lsm' },
  { id: 's10', name: '挂画3', category: '挂画', owner: 'lsm' },
  { id: 's11', name: '母婴1', category: '母婴', owner: '何沛' },
  { id: 's12', name: '德国母婴1', category: '母婴', owner: '何沛' },
  { id: 's13', name: '母婴2', category: '母婴', owner: '何沛' },
  { id: 's14', name: '母婴3', category: '母婴', owner: '何沛' },
  { id: 's15', name: '母婴4', category: '母婴', owner: '何沛' },
  { id: 's16', name: '英国母婴1', category: '母婴', owner: '何沛' },
  { id: 's17', name: '母婴5', category: '母婴', owner: 'Gina' },
  { id: 's18', name: '圣诞1', category: '粘胶', owner: 'Gina' },
];

// 2. 店铺明细档案：补全所有 18 家店铺的详细信息
export const SHOP_DETAILS: ShopDetail[] = [
  { id: 's1', name: '首饰1', country: '美国', category: '定制首饰', realShopName: 'CyprianJewelry', todeskId: '968 653 110', pcPin: '1990', registrantName: '洪依璇', email: 'xyx1@outlook.com', owner: '洪依璇', logo: 'https://picsum.photos/seed/s1/100/100' },
  { id: 's2', name: '首饰3', country: '美国', category: '定制首饰', realShopName: 'ElodiejewelryUS', todeskId: '970 947 158', pcPin: '-', registrantName: '洪依璇', email: 'xyx3@outlook.com', owner: '洪依璇', logo: 'https://picsum.photos/seed/s2/100/100' },
  { id: 's3', name: '首饰9', country: '澳洲', category: '定制首饰', realShopName: 'EternalGrace', todeskId: '948 430 982', pcPin: 'Pow74044', registrantName: '洪依璇', email: 'xyx9@outlook.com', owner: '洪依璇', logo: 'https://picsum.photos/seed/s3/100/100' },
  { id: 's4', name: '美国4', country: '美国', category: '天然石首饰', realShopName: 'US4_NatureStone', todeskId: '123 456 789', pcPin: '1234', registrantName: '洪依璇', email: 'xyx4@outlook.com', owner: '洪依璇', logo: 'https://picsum.photos/seed/s4/100/100' },
  { id: 's5', name: '天然石4', country: '美国', category: '天然石首饰', realShopName: 'NatureGems4', todeskId: '234 567 890', pcPin: '5678', registrantName: '洪陪郡', email: 'hpj4@outlook.com', owner: '洪陪郡', logo: 'https://picsum.photos/seed/s5/100/100' },
  { id: 's6', name: '德国天然石', country: '德国', category: '天然石首饰', realShopName: 'GermanStoneArt', todeskId: '345 678 901', pcPin: '9012', registrantName: '洪依璇', email: 'xyx_de@outlook.com', owner: '洪依璇', logo: 'https://picsum.photos/seed/s6/100/100' },
  { id: 's7', name: '阳光捕手1', country: '美国', category: '阳光捕手', realShopName: 'SunCatcher_A', todeskId: '521 361 803', pcPin: '4169', registrantName: 'gina', email: 'gina1@gmail.com', owner: 'gina', logo: 'https://picsum.photos/seed/s7/100/100' },
  { id: 's8', name: '灯光画--阳光捕手2', country: '美国', category: '阳光捕手', realShopName: 'LightGifts_B', todeskId: '678 901 234', pcPin: '1122', registrantName: 'gina', email: 'gina2@gmail.com', owner: 'gina', logo: 'https://picsum.photos/seed/s8/100/100' },
  { id: 's9', name: '挂画1', country: '美国', category: '挂画', realShopName: 'WallArt_Master', todeskId: '789 012 345', pcPin: '3344', registrantName: 'lsm', email: 'lsm1@gmail.com', owner: 'lsm', logo: 'https://picsum.photos/seed/s9/100/100' },
  { id: 's10', name: '挂画3', country: '美国', category: '挂画', realShopName: 'WallArt_Pro', todeskId: '890 123 456', pcPin: '5566', registrantName: 'lsm', email: 'lsm3@gmail.com', owner: 'lsm', logo: 'https://picsum.photos/seed/s10/100/100' },
  { id: 's11', name: '母婴1', country: '美国', category: '母婴', realShopName: 'BabyCare_01', todeskId: '278 389 446', pcPin: '7466', registrantName: '何沛', email: 'hp1@gmail.com', owner: '何沛', logo: 'https://picsum.photos/seed/s11/100/100' },
  { id: 's12', name: '德国母婴1', country: '德国', category: '母婴', realShopName: 'BabyCare_DE', todeskId: '012 345 678', pcPin: '7788', registrantName: '何沛', email: 'hp_de@gmail.com', owner: '何沛', logo: 'https://picsum.photos/seed/s12/100/100' },
  { id: 's13', name: '母婴2', country: '美国', category: '母婴', realShopName: 'BabyCare_02', todeskId: '123 123 123', pcPin: '1111', registrantName: '何沛', email: 'hp2@gmail.com', owner: '何沛', logo: 'https://picsum.photos/seed/s13/100/100' },
  { id: 's14', name: '母婴3', country: '美国', category: '母婴', realShopName: 'BabyCare_03', todeskId: '234 234 234', pcPin: '2222', registrantName: '何沛', email: 'hp3@gmail.com', owner: '何沛', logo: 'https://picsum.photos/seed/s14/100/100' },
  { id: 's15', name: '母婴4', country: '美国', category: '母婴', realShopName: 'BabyCare_04', todeskId: '345 345 345', pcPin: '3333', registrantName: '何沛', email: 'hp4@gmail.com', owner: '何沛', logo: 'https://picsum.photos/seed/s15/100/100' },
  { id: 's16', name: '英国母婴1', country: '英国', category: '母婴', realShopName: 'BabyCare_UK', todeskId: '456 456 456', pcPin: '4444', registrantName: '何沛', email: 'hp_uk@gmail.com', owner: '何沛', logo: 'https://picsum.photos/seed/s16/100/100' },
  { id: 's17', name: '母婴5', country: '美国', category: '母婴', realShopName: 'BabyCare_05', todeskId: '567 567 567', pcPin: '5555', registrantName: 'Gina', email: 'gina_baby@gmail.com', owner: 'Gina', logo: 'https://picsum.photos/seed/s17/100/100' },
  { id: 's18', name: '圣诞1', country: '美国', category: '粘胶', realShopName: 'Xmas_Stick', todeskId: '678 678 678', pcPin: '6666', registrantName: 'Gina', email: 'gina_xmas@gmail.com', owner: 'Gina', logo: 'https://picsum.photos/seed/s18/100/100' },
];

// 3. 每日营业额数据：1/1 - 1/17 的原始表格数据
const RAW_REVENUE_DATA = [
  [73.99, 540.31, 0, 338.71, 15.6, 82.32, 391.77, 143.95, 111, 0, 3662.05, 51.49, 269.44, 24.3, 0, 0, 107.8, 939.46],
  [75.4, 363.92, 27.98, 68.42, 44.65, 93.32, 636.48, 52.29, 0, 0, 2335.09, 0, 223.24, 82.3, 29.1, 74.74, 190, 598.9],
  [-23.79, 390.05, 0, 224.18, 16.07, 85.16, 385.55, 236.14, 488, 0, 3007.3, 0, 173.58, 202.4, 35.76, 60.8, 92.8, 782.04],
  [108.39, 294.21, 0, 109.34, 128.52, 60.48, 508.1, 239.46, 738.4, 0, 3821.43, 765.43, 104.2, 75.9, 150.79, 0, 216.25, 954.68],
  [43.76, 201.74, 0, 230.02, 93.72, 149.88, 326.27, 238.65, 418.5, 153.6, 3069.41, 338.16, 99.96, 114.7, 117.62, 0, 196.2, 1116.92],
  [67.95, 345.16, 0, 210.04, 0, 76.04, 415.57, 119.18, 290.4, 0, 3118.66, 362.58, 109.42, 0, 53.64, 0, 0, 1001.8],
  [69.5, 312.61, 0, 174.31, 16.07, 30.24, 1016.26, 84.28, 250.7, 0, 2247.06, 360.98, 139.08, 0, 53.09, 0, 0.45, 1114.2],
  [21.78, 190.45, 0, 261.95, 0, 42.4, 327, 111.12, 370.9, 0, 3019.5, 740.73, 0, 97.52, 57.19, 0, 93.25, 1079.94],
  [46.02, 236.8, 19.33, 368.02, 0, 47.7, 414.04, 159.47, 97.6, 0, 3645.46, 668.02, 201.23, 83.36, 79.96, 0, 0, 817.06],
  [67.35, 330.75, 0, 500.01, 0, 30.24, 262.96, 225.84, 434.5, 615.4, 3718.04, 301.2, 20.78, 184.1, 73.85, 0, 0, 827.8],
  [119.6, 311, 0, 368.45, 16.07, 80.45, 282.48, 246.62, 195, 0, 3150, 788.76, 0, 93.9, -5.79, 0, 0, 921.2],
  [66.05, 463, 0, 236.55, 16.07, 138.3, 75.52, 107, 305, 0, 2989.97, 646.48, 138.07, 56.52, 81.79, 0, 0, 1355.4],
  [68, 329, 0, 113, 29.45, 0, 340, 197, 0, 0, 3341.03, 311.05, 0, 106, 18, 15.05, 0, 1569.6],
  [171, 514.59, 0, 209, -0.2, 77.35, 311, 185, 319, 271, 3273.63, 520.37, 118, 112, 64, 0, 0, 1623],
  [64, 616.9, 0.2, 234, 49.74, 0, 438.43, 80, 86, 0, 3156.37, 410.2, 67, 113, 20, 30.13, 329.3, 2242],
  [142, 508.51, -0.2, 122, 0, 44.54, 150.57, 406.07, 65.26, 168, 2412, 489.9, 152, 26, 21, 0, -0.05, 1410],
  [155.78, 566.72, 0, 147.94, 0.64, 15.24, 189.22, 51.58, 0, 0, 3439.91, 268.39, 144.44, 79, 18.67, 0, 120.75, 1928],
];

export const MOCK_DAILY_LOGS: DailyLog[] = RAW_REVENUE_DATA.map((row, i) => {
  const shopData: Record<string, { revenue: number }> = {};
  SHOP_CONFIGS.forEach((shop, shopIdx) => {
    shopData[shop.id] = { revenue: row[shopIdx] || 0 };
  });
  return {
    date: `1/${(i + 1).toString().padStart(2, '0')}`,
    shopData
  };
});

// 4. 广告费：更新至图片所示数值
export const MOCK_AD_SPEND: MonthlyAdSpend[] = [
  { shopId: 's1', amount: 129.21 }, { shopId: 's2', amount: 636.00 }, { shopId: 's3', amount: 7.26 },
  { shopId: 's4', amount: 215.55 }, { shopId: 's5', amount: 93.72 }, { shopId: 's6', amount: 192.30 },
  { shopId: 's7', amount: 1432.76 }, { shopId: 's8', amount: 626.96 }, { shopId: 's9', amount: 1363.23 },
  { shopId: 's10', amount: 140.00 }, { shopId: 's11', amount: 7055.00 }, { shopId: 's12', amount: 879.00 },
  { shopId: 's13', amount: 163.30 }, { shopId: 's14', amount: 343.00 }, { shopId: 's15', amount: 229.34 },
  { shopId: 's16', amount: 3.61 }, { shopId: 's17', amount: 259.95 }, { shopId: 's18', amount: 1326.00 },
];

export const SHOPS: Shop[] = SHOP_CONFIGS.slice(0, 5).map(s => ({
  id: s.id,
  name: s.name,
  revenue: Number((Math.random() * 20000).toFixed(2)),
  orders: Math.floor(Math.random() * 300),
  conversionRate: Number((Math.random() * 5).toFixed(2)),
  status: 'active',
  avatar: `https://picsum.photos/seed/${s.id}/100/100`
}));

export const DAILY_STATS: DailyMetric[] = Array.from({ length: 30 }, (_, i) => ({
  date: `2024-01-${(i + 1).toString().padStart(2, '0')}`,
  revenue: Number((400 + Math.random() * 600).toFixed(2)),
}));

export const ORDERS: Order[] = [
  { id: 'ORD-001', shopId: 's1', customerName: 'Alice Johnson', items: ['Handmade Necklace'], date: '2024-01-15', status: 'shipped', amount: 85.00 },
];
