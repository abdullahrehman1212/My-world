import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BarChart, PenTool as ToolIcon, Plus, Download, TrendingUp, RefreshCcw, UserPlus, FilePlus, Bell } from 'lucide-react';
import Button from '../components/ui/Button';
import { tools } from '../data/tools';

const AdminDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 pb-16">
      <div className="bg-gray-900/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                size="md" 
                icon={<Download size={16} />}
              >
                Export Data
              </Button>
              <Button 
                variant="primary" 
                size="md" 
                icon={<Plus size={16} />}
              >
                Add New Tool
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-600/20 text-blue-500">
              <Users size={24} />
            </div>
            <h3 className="mb-1 text-lg font-medium text-white">Active Users</h3>
            <p className="text-3xl font-bold text-white">1,247</p>
            <div className="mt-2 flex items-center text-sm text-green-500">
              <TrendingUp size={14} className="mr-1" />
              <span>+12% this month</span>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-purple-600/20 text-purple-500">
              <ToolIcon size={24} />
            </div>
            <h3 className="mb-1 text-lg font-medium text-white">Total Tools</h3>
            <p className="text-3xl font-bold text-white">{tools.length}</p>
            <div className="mt-2 flex items-center text-sm text-yellow-500">
              <RefreshCcw size={14} className="mr-1" />
              <span>{tools.filter(t => t.isUpcoming).length} upcoming</span>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-green-600/20 text-green-500">
              <BarChart size={24} />
            </div>
            <h3 className="mb-1 text-lg font-medium text-white">Total Uses</h3>
            <p className="text-3xl font-bold text-white">34,592</p>
            <div className="mt-2 flex items-center text-sm text-green-500">
              <TrendingUp size={14} className="mr-1" />
              <span>+28% this month</span>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-red-600/20 text-red-500">
              <Bell size={24} />
            </div>
            <h3 className="mb-1 text-lg font-medium text-white">Alerts</h3>
            <p className="text-3xl font-bold text-white">3</p>
            <div className="mt-2 flex items-center text-sm text-red-500">
              <span>2 require action</span>
            </div>
          </div>
        </div>
        
        {/* Recent Activities */}
        <div className="mb-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Recent Activities</h2>
            <button className="text-sm text-purple-500 hover:text-purple-400">
              View all
            </button>
          </div>
          
          <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-800/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                    Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                    IP Address
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 bg-gray-900">
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-600/20 text-green-500">
                        <UserPlus size={16} />
                      </div>
                      <span className="ml-3 text-white">New Sign Up</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    emma.jones@example.com
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    Account created successfully
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                    Today, 12:42 PM
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                    192.168.1.2
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600/20 text-blue-500">
                        <ToolIcon size={16} />
                      </div>
                      <span className="ml-3 text-white">Tool Usage</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    john.doe@example.com
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    Used "Image Compressor" 5 times
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                    Today, 11:30 AM
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                    192.168.1.45
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-600/20 text-purple-500">
                        <FilePlus size={16} />
                      </div>
                      <span className="ml-3 text-white">Tool Added</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    admin@example.com
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    Added "Password Generator" tool
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                    Yesterday, 3:15 PM
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-400">
                    192.168.1.1
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Popular Tools */}
        <div className="mb-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Most Popular Tools</h2>
            <Link 
              to="/admin/tools" 
              className="text-sm text-purple-500 hover:text-purple-400"
            >
              Manage all tools
            </Link>
          </div>
          
          <div className="overflow-hidden rounded-lg border border-gray-800 bg-gray-900">
            <table className="min-w-full divide-y divide-gray-800">
              <thead className="bg-gray-800/50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                    Tool
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                    Usage
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                    Popularity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 bg-gray-900">
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-blue-600/20 text-blue-500">
                        <img className="h-4 w-4" alt="Icon" />
                      </div>
                      <div>
                        <div className="font-medium text-white">Image Compressor</div>
                        <div className="text-xs text-gray-400">image</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    8,423
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2 w-full rounded-full bg-gray-700">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '85%' }}></div>
                      </div>
                      <span className="ml-2 text-sm text-white">85%</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex rounded-full bg-green-600/20 px-2 text-xs font-semibold leading-5 text-green-500">
                      Active
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                    <button className="font-medium text-purple-500 hover:text-purple-400">Edit</button>
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-purple-600/20 text-purple-500">
                        <img className="h-4 w-4" alt="Icon" />
                      </div>
                      <div>
                        <div className="font-medium text-white">QR Code Generator</div>
                        <div className="text-xs text-gray-400">generator</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    6,129
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2 w-full rounded-full bg-gray-700">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '72%' }}></div>
                      </div>
                      <span className="ml-2 text-sm text-white">72%</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex rounded-full bg-green-600/20 px-2 text-xs font-semibold leading-5 text-green-500">
                      Active
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                    <button className="font-medium text-purple-500 hover:text-purple-400">Edit</button>
                  </td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-red-600/20 text-red-500">
                        <img className="h-4 w-4" alt="Icon" />
                      </div>
                      <div>
                        <div className="font-medium text-white">PDF Tools</div>
                        <div className="text-xs text-gray-400">conversion</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-white">
                    5,847
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2 w-full rounded-full bg-gray-700">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '68%' }}></div>
                      </div>
                      <span className="ml-2 text-sm text-white">68%</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="inline-flex rounded-full bg-yellow-600/20 px-2 text-xs font-semibold leading-5 text-yellow-500">
                      Maintenance
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                    <button className="font-medium text-purple-500 hover:text-purple-400">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;