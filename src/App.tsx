import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Toaster, toast } from 'react-hot-toast';
import type { Task, ChatMessage } from './types/task';
import { triageTask, parseIntent } from './utils/nlp';
import { loadTasks, saveTasks } from './utils/storage';
import Sidebar from './components/Layout/Sidebar';
import ChatInput from './components/Layout/ChatInput';
import MainView from './components/MainView';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentView, setCurrentView] = useState<string>('Today');
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Keyboard Shortcuts
  useKeyboardShortcuts({
    'n': () => {
      const chatInput = document.querySelector('input[type="text"]') as HTMLInputElement;
      chatInput?.focus();
    },
    't': () => setCurrentView('Today'),
    'search': () => {
      const chatInput = document.querySelector('input[type="text"]') as HTMLInputElement;
      chatInput?.focus();
    }
  });

  // Load tasks on mount
  useEffect(() => {
    setTasks(loadTasks());

    setMessages([
      {
        id: uuidv4(),
        role: 'assistant',
        content: 'Welcome to Tri-Level Talk-To-Do. Try "add task for thetorqking.com" or just use #hashtags.',
        timestamp: Date.now()
      }
    ]);
  }, []);

  // Save tasks on change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((title: string, overrides: Partial<Task> = {}) => {
    const triage = triageTask(title);
    const newTask: Task = {
      id: uuidv4(),
      title: title.replace(/#\S+/g, '').replace(/for \S+/i, '').trim() || title, // Clean title
      priority: triage.priority,
      dueDateTime: triage.dueDate?.toISOString() || null,
      estimateMinutes: null,
      category: triage.category,
      project: triage.project,
      status: 'OPEN',
      notes: '',
      nextAction: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...overrides
    };

    setTasks(prev => [...prev, newTask]);
    toast.success(`Added to ${newTask.project || 'Inbox'}`);
    return newTask;
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    toast.error('Task deleted');
  }, []);

  const handleChatInput = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: text,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);

    const intent = parseIntent(text) as any;
    let responseContent = '';

    if (intent.type === 'CREATE_TASK') {
      const taskDescription = intent.query || text;
      const newTask = addTask(taskDescription);
      responseContent = `Added: "${newTask.title}" (${newTask.priority})${newTask.project ? ` to project ${newTask.project}` : ''}.`;
    } else if (intent.type === 'QUERY_TASKS') {
      if (intent.filter === 'TODAY_TOP3') {
        setCurrentView('Today');
        responseContent = "Showing Today's Top 3.";
      } else if (intent.filter === 'HIGH_PRIORITY') {
        setCurrentView('Backlog');
        responseContent = "Showing High Priority tasks.";
      }
    } else if (intent.type === 'QUERY_PROJECT') {
      setCurrentView(`Project: ${intent.project}`);
      responseContent = `Filtering for project: ${intent.project}`;
    } else {
      responseContent = "I've noted that down.";
    }

    const assistantMsg: ChatMessage = {
      id: uuidv4(),
      role: 'assistant',
      content: responseContent,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, assistantMsg]);
  };

  const highTasksCount = useMemo(() => tasks.filter(t => t.priority === 'HIGH' && t.status !== 'DONE').length, [tasks]);

  // Unique projects list
  const projects = useMemo(() => Array.from(new Set(tasks.map(t => t.project).filter(Boolean))), [tasks]);

  return (
    <>
      <Toaster position="top-right" toastOptions={{ style: { background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
      <Sidebar activeView={currentView} onViewChange={setCurrentView} projects={projects as string[]} />
      <main className="main-content">
        <div className="content-area">
          {highTasksCount > 7 && (
            <div className="glass" style={{ padding: '12px 20px', marginBottom: '24px', borderLeft: '4px solid #ef4444', background: 'rgba(239, 68, 68, 0.1)' }}>
              <p style={{ color: '#ef4444', fontWeight: 'bold' }}>⚠️ High Priority Overload</p>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Review your commitments.</p>
            </div>
          )}
          <MainView
            view={currentView}
            tasks={tasks}
            onUpdateTask={updateTask}
            onDeleteTask={deleteTask}
          />
        </div>
        <div className="chat-container">
          <ChatInput
            messages={messages}
            onSendMessage={handleChatInput}
          />
        </div>
      </main>
    </>
  );
};

export default App;
