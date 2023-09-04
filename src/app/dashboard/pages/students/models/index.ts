import { Course } from "../../courses/models";

export interface Student {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    courseId: number;
}

export interface CreateStudentData {
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    courseId: number;
}

export interface UpdateStudentData {
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    phone?: string;
    courseId?: number;
}

export interface StudentWithCourse extends Student {
    course: Course;
}
