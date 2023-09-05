import { Course } from "../../courses/models";

export interface Comission {
    id: number;
    courseId: number;
}

export interface CreateComissionData {
    id: number;
    courseId: number;
}

export interface UpdateComissionData {
    id?: number;
    courseId?: number;
}

export interface ComissionWithCourse extends Comission{
    course: Course;
}