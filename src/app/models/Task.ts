export interface TaskModel  {
    id: number;
    title: string;
    completed: boolean;
    editing?: boolean; // opcional
    description: string;
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export type FilterType = 'all' | 'active' | 'completed';