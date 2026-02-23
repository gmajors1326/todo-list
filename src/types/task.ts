export type Priority = "HIGH" | "MED" | "LOW";

export type TaskStatus = "OPEN" | "DOING" | "DONE" | "WAITING" | "SNOOZED";

export type Category =
    | "Work"
    | "Home"
    | "Health"
    | "Finance"
    | "Errands"
    | "Content"
    | "Other";

export interface Task {
    id: string;
    title: string;
    priority: Priority;
    dueDateTime: string | null; // ISO string
    estimateMinutes: 5 | 15 | 30 | 60 | 120 | null;
    category: Category;
    status: TaskStatus;
    notes: string;
    nextAction: string;
    createdAt: string;
    updatedAt: string;
    project?: string; // e.g. "thetorqking.com"
    recurringRule?: string; // e.g. "FREQ=WEEKLY;BYDAY=MO,WE,FR"
}

export type ReviewStep = "morning" | "midday" | "evening" | null;

export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: number;
    action?: {
        type: "CREATE_TASK" | "UPDATE_TASK" | "QUERY_TASKS" | "SUGGESTION";
        payload?: any;
    };
}
