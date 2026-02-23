import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import type { ChatMessage } from '../../types/task';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatInputProps {
    messages: ChatMessage[];
    onSendMessage: (text: string) => void;
    isMicActive: boolean;
    onToggleMic: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ messages, onSendMessage, isMicActive, onToggleMic }) => {
    const [input, setInput] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            onSendMessage(input);
            setInput('');
        }
    };

    return (
        <div className="chat-wrapper glass" style={{ height: '300px', display: 'flex', flexDirection: 'column', padding: '16px' }}>
            <div
                ref={scrollRef}
                style={{ flex: 1, overflowY: 'auto', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '8px' }}
            >
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '80%',
                                padding: '10px 16px',
                                borderRadius: '12px',
                                background: msg.role === 'user' ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                                color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
                                fontSize: '0.9rem',
                                lineHeight: '1.4'
                            }}
                        >
                            {msg.content}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button
                    type="button"
                    onClick={onToggleMic}
                    style={{
                        color: isMicActive ? '#ef4444' : '#94a3b8',
                        padding: '8px',
                        borderRadius: '50%',
                        background: isMicActive ? 'rgba(239, 68, 68, 0.1)' : 'transparent'
                    }}
                >
                    {isMicActive ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                <div style={{ flex: 1, position: 'relative' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a task or ask a question..."
                        style={{
                            width: '100%',
                            padding: '12px 16px',
                            borderRadius: '24px',
                            border: '1px solid rgba(255,255,255,0.1)',
                            background: 'rgba(255,255,255,0.05)',
                            color: '#fff',
                            outline: 'none'
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        background: '#38bdf8',
                        color: '#fff',
                        padding: '10px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};

export default ChatInput;
