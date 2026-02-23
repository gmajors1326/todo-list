import React, { useMemo } from 'react';
import type { Task } from '../types/task';
import TaskCard from './Tasks/TaskCard';
import TaskBoard from './Tasks/TaskBoard';
import { getVerseOfTheDay } from '../utils/verses';

interface MainViewProps {
    view: string;
    tasks: Task[];
    onUpdateTask: (id: string, updates: Partial<Task>) => void;
    onDeleteTask: (id: string) => void;
}

const MainView: React.FC<MainViewProps> = ({ view, tasks, onUpdateTask, onDeleteTask }) => {
    const isProjectView = view.startsWith('Project: ');
    const projectName = isProjectView ? view.replace('Project: ', '') : null;

    const verse = useMemo(() => getVerseOfTheDay(), []);

    const filteredTasks = tasks.filter(task => {
        if (projectName) {
            return task.project === projectName;
        }

        switch (view) {
            case 'Inbox':
                return !task.project && task.status === 'OPEN';
            case 'Today':
                if (task.status === 'DONE') return false;
                const today = new Date().toDateString();
                return task.dueDateTime ? new Date(task.dueDateTime).toDateString() === today : false;
            case 'This Week':
                return task.status !== 'DONE';
            case 'Waiting On':
                return task.status === 'WAITING';
            case 'Backlog':
                return task.status === 'OPEN';
            default:
                return true;
        }
    });

    const renderContent = () => {
        if (view === 'Today') {
            const top3 = filteredTasks.filter(t => t.priority === 'HIGH').slice(0, 3);
            const others = filteredTasks.filter(t => !top3.includes(t));

            return (
                <div className="fade-in">
                    <header style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>Today's Focus</h2>
                        <div className="glass" style={{
                            marginTop: '16px',
                            padding: '20px',
                            borderRadius: '12px',
                            borderLeft: '4px solid var(--accent-color)',
                            maxWidth: '600px',
                            background: 'rgba(56, 189, 248, 0.05)'
                        }}>
                            <p style={{
                                fontStyle: 'italic',
                                fontSize: '1.1rem',
                                color: 'var(--text-primary)',
                                lineHeight: '1.5',
                                marginBottom: '8px'
                            }}>
                                "{verse.text}"
                            </p>
                            <p style={{
                                textAlign: 'right',
                                fontWeight: '600',
                                fontSize: '0.85rem',
                                color: 'var(--accent-color)',
                                letterSpacing: '0.05em'
                            }}>
                                — {verse.reference}
                            </p>
                        </div>
                    </header>

                    <section style={{ marginBottom: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-color)' }}>Top 3 Outcomes</h3>
                        </div>
                        <div style={{ display: 'grid', gap: '16px' }}>
                            {top3.length > 0 ? top3.map(t => (
                                <TaskCard key={t.id} task={t} onUpdate={onUpdateTask} onDelete={onDeleteTask} />
                            )) : <p style={{ opacity: 0.5 }}>No top priorities set yet.</p>}
                        </div>
                    </section>

                    <section>
                        <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Scheduled Tasks</h3>
                        <div style={{ display: 'grid', gap: '12px' }}>
                            {others.map(t => (
                                <TaskCard key={t.id} task={t} onUpdate={onUpdateTask} onDelete={onDeleteTask} />
                            ))}
                        </div>
                    </section>
                </div>
            );
        }

        if (view === 'Backlog') {
            return <TaskBoard tasks={tasks} onUpdate={onUpdateTask} onDelete={onDeleteTask} />;
        }

        return (
            <div className="fade-in">
                <header style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>
                        {projectName ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ opacity: 0.5 }}>Project:</span> {projectName}
                            </div>
                        ) : view}
                    </h2>
                </header>
                <div style={{ display: 'grid', gap: '12px' }}>
                    {filteredTasks.length > 0 ? filteredTasks.map(t => (
                        <TaskCard key={t.id} task={t} onUpdate={onUpdateTask} onDelete={onDeleteTask} />
                    )) : <p style={{ opacity: 0.5 }}>No tasks found in this view.</p>}
                </div>
            </div>
        );
    };

    return renderContent();
};

export default MainView;
