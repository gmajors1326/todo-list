import React from 'react';
import type { Task } from '../../types/task';
import TaskCard from './TaskCard';

interface TaskBoardProps {
    tasks: Task[];
    onUpdate: (id: string, updates: Partial<Task>) => void;
    onDelete: (id: string) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onUpdate, onDelete }) => {
    const columns: { title: string; priority: Task['priority']; color: string }[] = [
        { title: 'High Priority', priority: 'HIGH', color: '#ef4444' },
        { title: 'Medium Priority', priority: 'MED', color: '#f59e0b' },
        { title: 'Low Priority', priority: 'LOW', color: '#10b981' }
    ];

    return (
        <div className="priority-board fade-in">
            {columns.map(col => (
                <div key={col.priority} className="priority-column">
                    <div className="column-header" style={{ borderColor: col.color }}>
                        <h3 style={{ color: col.color }}>{col.title}</h3>
                        <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                            {tasks.filter(t => t.priority === col.priority && t.status !== 'DONE').length}
                        </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {tasks
                            .filter(t => t.priority === col.priority && t.status !== 'DONE')
                            .map(task => (
                                <TaskCard key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskBoard;
