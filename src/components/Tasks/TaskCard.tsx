import React, { useState, useRef, useEffect } from 'react';
import type { Task, Priority } from '../../types/task';
import { CheckCircle2, Circle, Clock, Tag, Hash, AlertCircle, Trash2, Edit2 } from 'lucide-react';

interface TaskCardProps {
    task: Task;
    onUpdate: (id: string, updates: Partial<Task>) => void;
    onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate, onDelete }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showPriorityMenu, setShowPriorityMenu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(task.title);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const toggleStatus = () => {
        onUpdate(task.id, { status: task.status === 'DONE' ? 'OPEN' : 'DONE' });
    };

    const handlePriorityChange = (newPriority: Priority) => {
        onUpdate(task.id, { priority: newPriority });
        setShowPriorityMenu(false);
    };

    const handleSaveEdit = () => {
        if (editValue.trim() && editValue !== task.title) {
            onUpdate(task.id, { title: editValue.trim() });
        } else {
            setEditValue(task.title);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSaveEdit();
        } else if (e.key === 'Escape') {
            setEditValue(task.title);
            setIsEditing(false);
        }
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
                position: 'relative',
                zIndex: (showPriorityMenu || isEditing) ? 1000 : 1,
                padding: '16px'
            }}
        >
            <button onClick={toggleStatus} style={{ color: task.status === 'DONE' ? '#10b981' : '#94a3b8', marginTop: '2px' }}>
                {task.status === 'DONE' ? <CheckCircle2 size={24} /> : <Circle size={24} />}
            </button>

            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    {isEditing ? (
                        <input
                            ref={inputRef}
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleSaveEdit}
                            onKeyDown={handleKeyDown}
                            style={{
                                flex: 1,
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--accent-color)',
                                borderRadius: '4px',
                                color: '#fff',
                                padding: '4px 8px',
                                fontSize: '1rem',
                                outline: 'none',
                                fontWeight: '500'
                            }}
                        />
                    ) : (
                        <h4
                            onClick={() => setIsEditing(true)}
                            style={{
                                fontSize: '1rem',
                                fontWeight: '500',
                                textDecoration: task.status === 'DONE' ? 'line-through' : 'none',
                                cursor: 'text',
                                flex: 1
                            }}
                        >
                            {task.title}
                        </h4>
                    )}
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
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowPriorityMenu(!showPriorityMenu);
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                color: task.priority === 'HIGH' ? '#ef4444' : task.priority === 'MED' ? '#f59e0b' : '#10b981',
                                fontWeight: '600',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                background: 'rgba(255,255,255,0.05)'
                            }}
                        >
                            <AlertCircle size={14} />
                            {task.priority}
                        </button>

                        {showPriorityMenu && (
                            <div className="glass" style={{
                                position: 'absolute',
                                top: '100%',
                                left: '0',
                                zIndex: 10000,
                                padding: '8px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px',
                                background: '#1e293b',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                                marginTop: '4px',
                                minWidth: '100px'
                            }}>
                                {(['HIGH', 'MED', 'LOW'] as Priority[]).map(p => (
                                    <button
                                        key={p}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePriorityChange(p);
                                        }}
                                        style={{
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                            fontSize: '0.75rem',
                                            color: '#fff',
                                            background: p === task.priority ? 'rgba(56, 189, 248, 0.2)' : 'transparent',
                                            textAlign: 'left',
                                            transition: 'background 0.2s'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                        onMouseOut={(e) => e.currentTarget.style.background = p === task.priority ? 'rgba(56, 189, 248, 0.2)' : 'transparent'}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                background: p === 'HIGH' ? '#ef4444' : p === 'MED' ? '#f59e0b' : '#10b981'
                                            }} />
                                            {p}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

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

            {isHovered && (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                        onClick={() => setIsEditing(true)}
                        style={{ color: '#94a3b8', opacity: 0.7, padding: '4px' }}
                        title="Edit task"
                    >
                        <Edit2 size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        style={{ color: '#ef4444', opacity: 0.7, padding: '4px' }}
                        title="Delete task"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskCard;
