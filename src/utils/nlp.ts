import * as chrono from 'chrono-node';
import type { Priority, Category } from '../types/task';

export const triageTask = (text: string): { priority: Priority; category: Category; dueDate: Date | null, project?: string } => {
    const lowerText = text.toLowerCase();

    let priority: Priority = 'MED';

    const highKeywords = ['today', 'asap', 'urgent', 'deadline', 'due', 'invoice', 'customer', 'call', 'quote', 'shipment'];
    const lowKeywords = ['someday', 'maybe', 'idea', 'nice-to-have'];

    if (highKeywords.some(k => lowerText.includes(k))) {
        priority = 'HIGH';
    } else if (lowKeywords.some(k => lowerText.includes(k))) {
        priority = 'LOW';
    }

    const parsedDates = chrono.parse(text);
    let dueDate: Date | null = null;
    if (parsedDates.length > 0) {
        dueDate = parsedDates[0].start.date();

        const now = new Date();
        const fortyEightHoursFromNow = new Date(now.getTime() + 48 * 60 * 60 * 1000);
        if (dueDate <= fortyEightHoursFromNow) {
            priority = 'HIGH';
        }
    }

    let category: Category = 'Other';
    if (lowerText.includes('work')) category = 'Work';
    else if (lowerText.includes('home')) category = 'Home';
    else if (lowerText.includes('health')) category = 'Health';
    else if (lowerText.includes('finance')) category = 'Finance';
    else if (lowerText.includes('errands')) category = 'Errands';
    else if (lowerText.includes('content')) category = 'Content';

    // Project detection
    let project: string | undefined = undefined;

    const specificProjects = [
        'app.freespiritmarketer.com',
        'freespiritmarketer.com',
        'thetorqking.com',
        'texlinemortgage.com'
    ];

    // Check for specific project mentions
    const foundSpecific = specificProjects.find(p => lowerText.includes(p));

    if (foundSpecific) {
        project = foundSpecific;
    } else {
        // Detect #project or "for project.com"
        const projectMatch = text.match(/#(\S+)/);
        if (projectMatch) {
            project = projectMatch[1];
        } else if (lowerText.includes('for ')) {
            const parts = text.split(/for /i);
            if (parts.length > 1) {
                const potential = parts[1].trim().split(' ')[0].replace(/[.!?]/g, '');
                if (potential.includes('.') || potential.length > 3) {
                    project = potential;
                }
            }
        }
    }

    return { priority, category, dueDate, project };
};

export const parseIntent = (text: string) => {
    const lowerText = text.toLowerCase();

    if (lowerText.startsWith('add ') || lowerText.startsWith('new ') || lowerText.startsWith('create ')) {
        return { type: 'CREATE_TASK', query: text.replace(/^(add|new|create)\s+/i, '') };
    }

    if (lowerText.includes('what are my top 3') || lowerText.includes('show today')) {
        return { type: 'QUERY_TASKS', filter: 'TODAY_TOP3' };
    }

    if (lowerText.includes('high tasks')) {
        return { type: 'QUERY_TASKS', filter: 'HIGH_PRIORITY' };
    }

    if (lowerText.includes('show project') || lowerText.includes('tasks for project')) {
        const parts = text.split(/(?:show project|tasks for project)\s+/i);
        if (parts.length > 1) {
            return { type: 'QUERY_PROJECT', project: parts[1].trim().split(' ')[0] };
        }
    }

    return { type: 'CREATE_TASK', query: text };
};
