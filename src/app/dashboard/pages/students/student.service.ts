import { Injectable } from '@angular/core';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { CreateStudentData, Student, UpdateStudentData } from './models';
import { BehaviorSubject, Observable, Subject, delay, map, mergeMap, of, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private student: Student[] =  [
    
  ];

  private sendNotification$ = new Subject<string>()

  private _students$ = new BehaviorSubject<Student[]>([])
  private students$ = this._students$.asObservable()
 
  constructor(private notifier: NotifierService,  private httpClient: HttpClient) { 
    this.sendNotification$.subscribe({
      next: (message => alert(message))
    })
  }

  sendNotification(notification: string): void {
    this.sendNotification$.next(notification)
  }

  loadStudents(): void {
    
    this.httpClient.get<Student[]> (enviroment.baseApiUrl +'/students').subscribe({
      next: (resp) => {
        this._students$.next(resp)
      },
      error: () => {
        this.notifier.showError('No se pudieron cargar los estudiantes')
      },
     
    })
  }

  getStudents(): Observable<Student[]> {
    return this.students$
  }

  getStudentByID(id: number): Observable<Student | undefined> {
    return this.students$.pipe(
      map((students) => students.find((s) => s.id === id)), take(1))
  }

  createStudent(payLoad: CreateStudentData): void {
    
    this.httpClient.post<Student>(enviroment.baseApiUrl +'/students', payLoad)
    .pipe(
      mergeMap((studentCreate) => this.students$.pipe(take(1), map((currentArray) => [...currentArray, studentCreate])))
    )
    .subscribe({
      next: (updatedArray) => {
        this._students$.next(updatedArray)
      }
    })
  }

  updateStudentByID(id: Number, updatedStudent: UpdateStudentData): void {

    this.httpClient.put(enviroment.baseApiUrl +'/students/' + id, updatedStudent).subscribe({
      next: () => this.loadStudents()
    })
  }

  deleteStudentByID (id: number): void {
    
    this.httpClient.delete(enviroment.baseApiUrl +'/students/' + id)
    .pipe(
      mergeMap(() => this.students$.pipe(take(1), map((currentArray) => currentArray.filter((s) => s.id !== id )))))
      .subscribe({
        next: (updatedArray) => this._students$.next(updatedArray)
      })
  }

}

