import { useEffect } from 'react';

export const useKeyboardShortcuts = (actions: { [key: string]: () => void }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't trigger if user is typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            const key = e.key.toLowerCase();
            if (actions[key]) {
                e.preventDefault();
                actions[key]();
            }

            // Handle specific keys like /
            if (e.key === '/') {
                e.preventDefault();
                actions['search']();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [actions]);
};
