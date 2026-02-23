import React, { useState } from 'react';
import type { Task } from '../../types/task';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface ReviewWizardProps {
    type: 'morning' | 'midday' | 'evening';
    tasks: Task[];
    onComplete: () => void;
    onUpdateTask: (id: string, updates: Partial<Task>) => void;
}

const ReviewWizard: React.FC<ReviewWizardProps> = ({ type, tasks, onComplete }) => {
    const [step, setStep] = useState(0);

    const morningSteps = [
        { title: 'Due Today & Tomorrow', description: 'Review what is coming up soon.', filter: () => true },
        { title: 'Pick Top 3', description: 'What are the 3 non-negotiable outcomes today?', filter: () => true },
        { title: 'Time Blocking', description: 'Estimate your efforts.', filter: () => true }
    ];

    const steps = type === 'morning' ? morningSteps : (tasks.length > 0 ? morningSteps : []); // Basic fallback

    const handleNext = () => {
        if (step < steps.length - 1) setStep(step + 1);
        else onComplete();
    };

    return (
        <div className="glass fade-in" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: '32px', textAlign: 'center' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>{type.charAt(0).toUpperCase() + type.slice(1)} Review</h2>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    {steps.map((_, i) => (
                        <div key={i} style={{
                            width: '40px',
                            height: '4px',
                            borderRadius: '2px',
                            background: i <= step ? '#38bdf8' : 'rgba(255,255,255,0.1)'
                        }} />
                    ))}
                </div>
            </header>

            <div style={{ minHeight: '300px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{steps[step]?.title}</h3>
                <p style={{ color: '#94a3b8', marginBottom: '24px' }}>{steps[step]?.description}</p>

                <div style={{ display: 'grid', gap: '12px' }}>
                    <p style={{ opacity: 0.6 }}>Review items will appear here...</p>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                    onClick={() => setStep(s => Math.max(0, s - 1))}
                    style={{ visibility: step === 0 ? 'hidden' : 'visible', display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8' }}
                >
                    <ChevronLeft size={20} /> Back
                </button>
                <button
                    onClick={handleNext}
                    style={{
                        background: '#38bdf8',
                        color: '#fff',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    {step === steps.length - 1 ? 'Finish' : 'Continue'} <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default ReviewWizard;
