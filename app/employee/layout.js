'use client';

import Sidebar from '../components/sidebar/page';
import Navbar from '../components/navbar/page';

export default function EmployeeLayout({ children }) {
  // Mock user data - replace with actual auth context
  const user = {
    fullName: 'Employee User',
    role: 'employee'
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // Implement logout logic
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="employee" unreadCount={0} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar user={user} onLogout={handleLogout} />
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
