import React, { useState } from 'react';
import type { Task } from '../../types/task';
import { CheckCircle2, Circle, Clock, Tag } from 'lucide-react';

interface TaskCardProps {
    task: Task;
    onUpdate: (id: string, updates: Partial<Task>) => void;
    onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
    const [isHovered, setIsHovered] = useState(false);

    const toggleStatus = () => {
        onUpdate(task.id, { status: task.status === 'DONE' ? 'OPEN' : 'DONE' });
    };

    return (
        <div
            className={`task-card glass ${task.priority.toLowerCase()}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', opacity: task.status === 'DONE' ? 0.6 : 1 }}
        >
            <button onClick={toggleStatus} style={{ color: task.status === 'DONE' ? '#10b981' : '#94a3b8', marginTop: '2px' }}>
                {task.status === 'DONE' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
            </button>

            <div style={{ flex: 1 }}>
                <h4 style={{
                    fontSize: '1rem',
                    fontWeight: '500',
                    marginBottom: '4px',
                    textDecoration: task.status === 'DONE' ? 'line-through' : 'none'
                }}>
                    {task.title}
                </h4>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '0.8rem', color: '#94a3b8' }}>
                    {task.dueDateTime && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={14} />
                            {new Date(task.dueDateTime).toLocaleDateString()} {new Date(task.dueDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    )}
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Tag size={14} />
                        {task.category}
                    </span>
                    {task.estimateMinutes && <span>{task.estimateMinutes}m</span>}
                </div>
            </div>

            {isHovered && (
                <button
                    onClick={() => onDelete(task.id)}
                    style={{ color: '#ef4444', opacity: 0.7 }}
                >
                    <span style={{ fontSize: '0.8rem' }}>Delete</span>
                </button>
            )}
        </div>
    );
};

export default TaskCard;
