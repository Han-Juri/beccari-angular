import { Course } from "../../courses/models";

export interface Comission {
    id: number;
    course: Course;
}

export interface CreateComissionData {
    id: number;
    course: Course;
}

export interface UpdateComissionData {
    id?: number;
    course?: Course;
}