import { StudentService } from './../students/student.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Injectable } from '@angular/core';
import { CreateComissionData, Comission, UpdateComissionData } from './models';
import { BehaviorSubject, Observable, Subject, mergeMap, map, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroment';
import { CreateStudentData, Student } from '../students/models';


@Injectable({
  providedIn: 'root'
})
export class ComissionsService {
  private comission: Comission[] =  [
    
  ];

  private sendNotification$ = new Subject<string>()

  private _comissions$ = new BehaviorSubject<Comission[]>([])
  public comissions$ = this._comissions$.asObservable()
 
  constructor(private notifier: NotifierService, private httpClient: HttpClient, private studentService: StudentService) { 
    this.sendNotification$.subscribe({
      next: (message => alert(message))
    })
  }

  sendNotification(notification: string): void {
    this.sendNotification$.next(notification)
  }

  loadComissions(): void {
    
    this.httpClient.get<Comission[]> (enviroment.baseApiUrl +'/comissions').subscribe({
      next: (resp) => {
        this._comissions$.next(resp)
      },
      error: () => {
        this.notifier.showError('No se pudieron cargar los cursos')
      },
    })
  }

  getComissions(): Observable<Comission[]> {
    return this.comissions$
  }

  getComissionById(id: number): Observable<Comission | undefined> {
    return this.httpClient.get<Comission>(`${enviroment.baseApiUrl}/comissions/${id}`);
  }

  createComission(payLoad: CreateComissionData): void {
    
    this.httpClient.post<Comission>(enviroment.baseApiUrl +'/comissions', payLoad)
    .pipe(
      mergeMap((comissionCreate) => this.comissions$.pipe(take(1), map((currentArray) => [...currentArray, comissionCreate])))
    )
    .subscribe({
      next: (updatedArray) => {
        this._comissions$.next(updatedArray)
      }
    })
  }

  updateComissionByID(id: Number, updatedComission: UpdateComissionData): void {

    this.httpClient.put(enviroment.baseApiUrl +'/comissions/' + id, updatedComission).subscribe({
      next: () => this.loadComissions()
    })
  }

  deleteComissionByID(id: number): void {
    let studentsToRestore: Student[] = [];
  
    this.studentService.getStudentsByComissionId(id).subscribe(students => {
      studentsToRestore = students;
    });
  
    this.httpClient.delete(enviroment.baseApiUrl +'/comissions/' + id).subscribe({
      next: () => {
        
        studentsToRestore.forEach(student => {
          const studentPayload: CreateStudentData = {
            name: student.name,
            surname: student.surname,
            email: student.email,
            password: student.password,
            phone: student.phone,
            courseId: student.courseId
          };
          this.studentService.createStudent(studentPayload);
        });
  
        
        this.loadComissions();
      }
    });
  }
  
}