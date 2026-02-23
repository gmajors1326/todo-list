import React, { useState } from 'react';
import type { Task, Priority } from '../../types/task';
import { CheckCircle2, Circle, Clock, Tag, Hash, AlertCircle } from 'lucide-react';

interface TaskCardProps {
    task: Task;
    onUpdate: (id: string, updates: Partial<Task>) => void;
    onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showPriorityMenu, setShowPriorityMenu] = useState(false);

    const toggleStatus = () => {
        onUpdate(task.id, { status: task.status === 'DONE' ? 'OPEN' : 'DONE' });
    };

    const handlePriorityChange = (newPriority: Priority) => {
        onUpdate(task.id, { priority: newPriority });
        setShowPriorityMenu(false);
    };

    return (
        <div
            className={`task-card glass ${task.priority.toLowerCase()}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setShowPriorityMenu(false);
            }}
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                opacity: task.status === 'DONE' ? 0.6 : 1,
                position: 'relative'
            }}
        >
            <button onClick={toggleStatus} style={{ color: task.status === 'DONE' ? '#10b981' : '#94a3b8', marginTop: '2px' }}>
                {task.status === 'DONE' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
            </button>

            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <h4 style={{
                        fontSize: '1rem',
                        fontWeight: '500',
                        textDecoration: task.status === 'DONE' ? 'line-through' : 'none'
                    }}>
                        {task.title}
                    </h4>
                    {task.project && (
                        <span style={{
                            fontSize: '0.7rem',
                            background: 'rgba(56, 189, 248, 0.1)',
                            color: 'var(--accent-color)',
                            padding: '2px 8px',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                        }}>
                            <Hash size={10} />
                            {task.project}
                        </span>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '0.8rem', color: '#94a3b8' }}>
                    <button
                        onClick={() => setShowPriorityMenu(!showPriorityMenu)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: task.priority === 'HIGH' ? '#ef4444' : task.priority === 'MED' ? '#f59e0b' : '#10b981',
                            fontWeight: '600'
                        }}
                    >
                        <AlertCircle size={14} />
                        {task.priority}
                    </button>

                    {task.dueDateTime && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={14} />
                            {new Date(task.dueDateTime).toLocaleDateString()}
                        </span>
                    )}
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Tag size={14} />
                        {task.category}
                    </span>
                </div>
            </div>

            {showPriorityMenu && (
                <div className="glass" style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50px',
                    zIndex: 100,
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    marginTop: '4px'
                }}>
                    {(['HIGH', 'MED', 'LOW'] as Priority[]).map(p => (
                        <button
                            key={p}
                            onClick={() => handlePriorityChange(p)}
                            style={{
                                padding: '6px 12px',
                                borderRadius: '4px',
                                fontSize: '0.8rem',
                                color: '#fff',
                                background: p === 'HIGH' ? 'rgba(239, 68, 68, 0.2)' : p === 'MED' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                                textAlign: 'left'
                            }}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            )}

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
