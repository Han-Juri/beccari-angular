export interface Course {
    id: number;
    name: string;
    teacher: string;
    date: string;
    shift: 'Matutino' | 'Vespertino';
}

export interface CreateCourseData {
    id: number;
    name: string;
    teacher: string;
    date: string;
    shift: 'Matutino' | 'Vespertino';
}

export interface UpdateCourseData {
    id?: number;
    name?: string;
    teacher?: string;
    date?: string;
    shift?: 'Matutino' | 'Vespertino';
}