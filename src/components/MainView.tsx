import React from 'react';
import type { Task } from '../types/task';
import TaskCard from './Tasks/TaskCard';
import TaskBoard from './Tasks/TaskBoard';

interface MainViewProps {
    view: string;
    tasks: Task[];
    onUpdateTask: (id: string, updates: Partial<Task>) => void;
    onDeleteTask: (id: string) => void;
}

const MainView: React.FC<MainViewProps> = ({ view, tasks, onUpdateTask, onDeleteTask }) => {
    const isProjectView = view.startsWith('Project: ');
    const projectName = isProjectView ? view.replace('Project: ', '') : null;

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
                        <p style={{ color: 'var(--text-secondary)' }}>Quality over quantity.</p>
                    </header>

                    <section style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', color: 'var(--accent-color)' }}>Top 3 Outcomes</h3>
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
