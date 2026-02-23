import React from 'react';
import {
    Inbox,
    Calendar,
    LayoutDashboard,
    Archive,
    Clock,
    Repeat,
    Download,
    Hash
} from 'lucide-react';
import { exportTasks, loadTasks } from '../../utils/storage';

interface SidebarProps {
    activeView: string;
    onViewChange: (view: string) => void;
    projects: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, projects }) => {
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

            <nav style={{ flex: 1, overflowY: 'auto' }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <button
                                onClick={() => onViewChange(item.name)}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '10px 16px',
                                    borderRadius: '8px',
                                    color: activeView === item.name ? 'var(--accent-color)' : 'var(--text-secondary)',
                                    background: activeView === item.name ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                                    fontWeight: activeView === item.name ? '600' : '400',
                                    textAlign: 'left'
                                }}
                            >
                                <item.icon size={18} />
                                <span>{item.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>

                {projects.length > 0 && (
                    <>
                        <h3 style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '32px', marginBottom: '12px', color: 'var(--text-secondary)', paddingLeft: '16px' }}>Projects</h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {projects.map((project) => (
                                <li key={project}>
                                    <button
                                        onClick={() => onViewChange(`Project: ${project}`)}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '12px',
                                            padding: '8px 16px',
                                            borderRadius: '8px',
                                            color: activeView === `Project: ${project}` ? 'var(--accent-color)' : 'var(--text-secondary)',
                                            background: activeView === `Project: ${project}` ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                                            fontSize: '0.9rem',
                                            textAlign: 'left'
                                        }}
                                    >
                                        <Hash size={14} />
                                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{project}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </nav>

            <div className="sidebar-footer" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: 'auto' }}>
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
