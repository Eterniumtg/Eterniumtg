
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Package, DollarSign, ShoppingCart, Users, MoreVertical, Search, Plus } from 'lucide-react';
import { Order, Product, OrderStatus } from '../types';

interface AdminDashboardProps {
  orders: Order[];
  products: Product[];
  onUpdateStatus: (id: string, status: OrderStatus) => void;
  onAddProduct: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders, products, onUpdateStatus, onAddProduct }) => {
  const totalRevenue = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalSalesCount = orders.length;
  const outOfStock = products.filter(p => p.stock <= 0).length;

  const chartData = orders.slice(-7).map(o => ({
    date: new Date(o.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    amount: o.totalAmount
  }));

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-serif">Maison Analytics</h1>
          <button 
            onClick={onAddProduct}
            className="flex items-center space-x-2 bg-black text-white px-6 py-3 text-xs tracking-widest font-bold hover:bg-[#D4AF37] transition-all"
          >
            <Plus size={16} />
            <span>ADD NEW PRODUCT</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: <DollarSign size={20} className="text-[#D4AF37]" />, sub: '+12% from last month' },
            { label: 'Orders', value: totalSalesCount, icon: <ShoppingCart size={20} className="text-[#D4AF37]" />, sub: '8 pending delivery' },
            { label: 'Total Products', value: products.length, icon: <Package size={20} className="text-[#D4AF37]" />, sub: `${outOfStock} out of stock` },
            { label: 'Active Users', value: '1,429', icon: <Users size={20} className="text-[#D4AF37]" />, sub: '+43 this week' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-sm shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{stat.label}</span>
                {stat.icon}
              </div>
              <div className="text-2xl font-serif mb-2">{stat.value}</div>
              <div className="text-[10px] text-gray-400 font-medium">{stat.sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2 bg-white p-8 rounded-sm shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold tracking-widest mb-8 uppercase">Revenue Stream</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#999'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#999'}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '0', border: '1px solid #f0f0f0', boxShadow: 'none'}}
                    itemStyle={{fontSize: '12px', fontWeight: 'bold'}}
                  />
                  <Line type="monotone" dataKey="amount" stroke="#D4AF37" strokeWidth={3} dot={{r: 4, fill: '#D4AF37'}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold tracking-widest mb-8 uppercase">Recent Orders</h3>
            <div className="space-y-6">
              {orders.slice(-5).reverse().map((order) => (
                <div key={order.id} className="flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold font-serif">{order.id}</p>
                    <p className="text-[10px] text-gray-400">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium">${order.totalAmount.toFixed(2)}</p>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${
                      order.status === OrderStatus.DELIVERED ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Management Table */}
        <div className="mt-10 bg-white shadow-sm rounded-sm border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-sm font-bold tracking-widest uppercase">Inventory Management</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="pl-10 pr-4 py-2 bg-gray-50 text-xs rounded-full border-none outline-none focus:ring-1 focus:ring-[#D4AF37]"
              />
            </div>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] tracking-widest uppercase text-gray-400">
                <th className="px-8 py-4 font-bold">Product</th>
                <th className="px-8 py-4 font-bold">Category</th>
                <th className="px-8 py-4 font-bold">Stock</th>
                <th className="px-8 py-4 font-bold">Price</th>
                <th className="px-8 py-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-sm overflow-hidden">
                        <img src={p.imageUrls[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-serif font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-xs text-gray-500 uppercase">{p.category}</td>
                  <td className="px-8 py-4">
                    <span className={`text-xs ${p.stock <= 5 ? 'text-red-500 font-bold' : 'text-gray-600'}`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="px-8 py-4 text-sm font-medium">${p.price}</td>
                  <td className="px-8 py-4 text-right">
                    <button className="text-gray-400 hover:text-black">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
