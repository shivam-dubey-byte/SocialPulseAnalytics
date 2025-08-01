import React, { useState } from 'react';
// We'll use the 'recharts' library for charts. Make sure to install it:
// npm install recharts
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


// --- ICONS (No changes from previous version) ---
const MenuIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);
const SearchIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" />
  </svg>
);
const UserIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const XIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// --- Chart Data ---
const trafficPieData = [
  { name: 'Neutral', value: 24, breakdown: [
      { name: 'Source A', value: '10%' },
      { name: 'Source B', value: '14%' },
    ]
  },
  { name: 'Negative', value: 26, breakdown: [
      { name: 'Source X', value: '16%' },
      { name: 'Source Y', value: '10%' },
    ]
  },
  { name: 'Positive', value: 50, breakdown: [
      { name: 'Twitter', value: '20%' },
      { name: 'Reddit', value: '30%' },
      { name: 'Youtube', value: '40%' },
    ]
  },
];
// Colors match the new labels: Blue (Neutral), Red (Negative), Green (Positive)
const TRAFFIC_PIE_COLORS = ['#3b82f6', '#ef4444', '#10b981'];

const positiveWordsData = [
  { name: 'Happy', count: 120 }, { name: 'Success', count: 98 },
  { name: 'Great', count: 86 }, { name: 'Joy', count: 74 },
  { name: 'Love', count: 65 },
];

const negativeWordsData = [
  { name: 'Sad', count: 45 }, { name: 'Fail', count: 32 },
  { name: 'Poor', count: 28 }, { name: 'Hate', count: 21 },
  { name: 'Lost', count: 15 },
];

const postAudienceData = [
    { name: 'Youtube', positive: 1200, neutral: 700, negative: 150 },
    { name: 'Twitter', positive: 2500, neutral: 1200, negative: 300 },
    { name: 'Reddit', positive: 800, neutral: 1500, negative: 900 },
];

const perceptionPieData = [
    { name: 'Issues not resolve', value: 30 },
    { name: 'Confused', value: 25 },
    { name: 'Backout', value: 20 },
    { name: 'No Opinion', value: 15 },
    { name: 'Angry', value: 10 },
];
const PERCEPTION_PIE_COLORS = ['#ef4444', '#f97316', '#3b82f6', '#a855f7', '#64748b'];

// Custom Tooltip for the first Pie Chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    // Always show the breakdown table if it exists
    if (data.breakdown) {
      return (
        <div className="bg-gray-700 p-3 rounded-lg border border-gray-600 shadow-lg text-white">
          <table className="w-full text-sm">
            <tbody>
              {data.breakdown.map((item, index) => (
                <tr key={index} className={index > 0 ? "border-t border-gray-600" : ""}>
                  <td className="py-1 pr-4">{item.name}</td>
                  <td className="py-1 text-right font-semibold">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
  return null;
};

// Custom Label for the first Pie Chart
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, payload }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="font-bold">
      {payload.name}
    </text>
  );
};


// --- Main Application Component ---
export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const ChartContainer = ({ title, children }) => (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
      {title && <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>}
      <div style={{height: '300px'}}>
        {children}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gray-900 text-white font-sans">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5 flex justify-between items-center border-b border-gray-700">
            <h2 className="text-xl font-bold">Navigation</h2>
            <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500">
                <XIcon className="h-6 w-6"/>
            </button>
        </div>
        <nav className="mt-5">
          <a href="#" className="block px-5 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md mx-2">Dashboard</a>
          <div className="mt-4 pt-4 border-t border-gray-700 mx-2">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Social</h3>
            <a href="#" className="block px-5 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md mx-2 mt-2">Youtube</a>
            <a href="#" className="block px-5 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md mx-2">Twitter</a>
            <a href="#" className="block px-5 py-3 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md mx-2">Reddit</a>
          </div>
        </nav>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleSidebar}></div>}

      {/* Main Content */}
      <div className="flex flex-col flex-1 transition-all duration-300 ease-in-out">
        {/* Header */}
        <header className="bg-gray-800/80 backdrop-blur-sm sticky top-0 z-30 shadow-md">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-label="Open sidebar">
                  <MenuIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-center">
                <div className="max-w-lg w-full lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">Search</label>
                  <div className="relative text-gray-400 focus-within:text-gray-200">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center"><SearchIcon className="h-5 w-5" /></div>
                    <input id="search" className="block w-full bg-gray-700/50 border border-transparent rounded-md py-2 pl-10 pr-3 leading-5 text-gray-200 placeholder-gray-400 focus:outline-none focus:bg-gray-700 focus:border-indigo-500 focus:ring-indigo-500 focus:text-white sm:text-sm" placeholder="Search" type="search" name="search" />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">View profile</span>
                  <UserIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* Row 1: Traffic Sources Pie Chart */}
            <ChartContainer title="">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie 
                        data={trafficPieData} 
                        cx="50%" 
                        cy="50%" 
                        labelLine={false} 
                        label={renderCustomizedLabel}
                        outerRadius={120} 
                        fill="#8884d8" 
                        dataKey="value"
                      >
                        {trafficPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={TRAFFIC_PIE_COLORS[index % TRAFFIC_PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(107, 114, 128, 0.2)'}}/>
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>

            {/* Row 2: Words Analysis */}
            <div>
                <h2 className="text-2xl font-bold text-white mb-4">Words Analysis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ChartContainer title="Top 5 Positive Words">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={positiveWordsData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                                <XAxis type="number" stroke="#9ca3af" />
                                <YAxis type="category" dataKey="name" stroke="#9ca3af" width={60} />
                                <Tooltip contentStyle={{ backgroundColor: '#374151', border: 'none', borderRadius: '0.5rem' }} cursor={{fill: 'rgba(107, 114, 128, 0.2)'}}/>
                                <Bar dataKey="count" fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                    <ChartContainer title="Top 5 Negative Words">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={negativeWordsData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                                <XAxis type="number" stroke="#9ca3af" />
                                <YAxis type="category" dataKey="name" stroke="#9ca3af" width={60}/>
                                <Tooltip contentStyle={{ backgroundColor: '#374151', border: 'none', borderRadius: '0.5rem' }} cursor={{fill: 'rgba(107, 114, 128, 0.2)'}}/>
                                <Bar dataKey="count" fill="#ef4444" />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </div>
            </div>

            {/* Row 3: Post vs Audience Analysis */}
            <ChartContainer title="Post vs Audience Analysis">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={postAudienceData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip contentStyle={{ backgroundColor: '#374151', border: 'none', borderRadius: '0.5rem' }} cursor={{fill: 'rgba(107, 114, 128, 0.2)'}}/>
                    <Legend />
                    <Bar dataKey="positive" fill="#10b981" name="Positive"/>
                    <Bar dataKey="neutral" fill="#3b82f6" name="Neutral"/>
                    <Bar dataKey="negative" fill="#ef4444" name="Negative"/>
                  </BarChart>
                </ResponsiveContainer>
            </ChartContainer>

            {/* Row 4: User's Perception Analysis */}
            <ChartContainer title="User's Perception Analysis">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={perceptionPieData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label>
                        {perceptionPieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PERCEPTION_PIE_COLORS[index % PERCEPTION_PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#374151', border: 'none', borderRadius: '0.5rem' }}/>
                      <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>

          </div>
        </main>
      </div>
    </div>
  );
}
