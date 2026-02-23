import React from 'react';
import {
    Inbox,
    Calendar,
    LayoutDashboard,
    Archive,
    Clock,
    Repeat,
    Download
} from 'lucide-react';
import { exportTasks, loadTasks } from '../../utils/storage';

interface SidebarProps {
    activeView: string;
    onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
    const menuItems = [
        { name: 'Inbox', icon: Inbox },
        { name: 'Today', icon: LayoutDashboard },
        { name: 'This Week', icon: Calendar },
        { name: 'Backlog', icon: Archive },
        { name: 'Waiting On', icon: Clock },
        { name: 'Recurring', icon: Repeat },
    ];

    return (
        <aside className="sidebar">
            <div className="logo" style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: '1.2rem', fontWeight: '800', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Tri-Level Talk
                </h1>
            </div>

            <nav style={{ flex: 1 }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <button
                                onClick={() => onViewChange(item.name)}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 16px',
                                    borderRadius: '8px',
                                    color: activeView === item.name ? 'var(--accent-color)' : 'var(--text-secondary)',
                                    background: activeView === item.name ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                                    fontWeight: activeView === item.name ? '600' : '400',
                                    textAlign: 'left'
                                }}
                            >
                                <item.icon size={20} />
                                <span>{item.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                <button
                    onClick={() => exportTasks(loadTasks())}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', color: 'var(--text-secondary)' }}
                >
                    <Download size={20} />
                    <span>Export Data</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
