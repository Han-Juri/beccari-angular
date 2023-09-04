import { NotifierService } from 'src/app/core/services/notifier.service';
import { Injectable } from '@angular/core';
import { CreateUserData, User, UpdateUserData } from './models';
import { BehaviorSubject, Observable, Subject, map, mergeMap, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { generateRandomString } from 'src/app/shared/utils/helpers';
import { enviroment } from 'src/enviroments/enviroment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User[] =  [
    
  ];

  private sendNotification$ = new Subject<string>()

  private _users$ = new BehaviorSubject<User[]>([])
  private users$ = this._users$.asObservable()
  private _isLoading$ = new BehaviorSubject(false)
  public isLoading$ = this._isLoading$.asObservable()
 
  constructor(private notifier: NotifierService, private httpClient: HttpClient) { 
    this.sendNotification$.subscribe({
      next: (message => alert(message))
    })
  }

  sendNotification(notification: string): void {
    this.sendNotification$.next(notification)
  }

  loadUsers(): void {
    
    this._isLoading$.next(true)
    this.httpClient.get<User[]> (enviroment.baseApiUrl +'/users').subscribe({
      next: (resp) => {
        this._users$.next(resp)
      },
      error: () => {
        this.notifier.showError('No se pudieron cargar los usuarios')
      },
      complete: () => {
        this._isLoading$.next(false)
      }
    })
  }

  getUsers(): Observable<User[]> {
    return this.users$
  }

    getUserByID(id: number): Observable<User | undefined> {
    return this.users$.pipe(
      map((users) => users.find((u) => u.id === id)), take(1))
  }

  createUser(payLoad: CreateUserData): void {

    const token = generateRandomString(20);
    this.httpClient.post<User>(enviroment.baseApiUrl +'/users', {...payLoad, token})
    .pipe(
      mergeMap((userCreate) => this.users$.pipe(take(1), map((currentArray) => [...currentArray, userCreate])))
    )
    .subscribe({
      next: (updatedArray) => {
        this._users$.next(updatedArray)
      }
    })
  }

  updateUserByID(id: Number, updatedUser: UpdateUserData): void {
   
    this.httpClient.put(enviroment.baseApiUrl +'/users/' + id, updatedUser).subscribe({
      next: () => this.loadUsers()
    })
  }

  deleteUserByID (id: number): void {
    
    this.httpClient.delete(enviroment.baseApiUrl +'/users/' + id)
    .pipe(
      mergeMap(() => this.users$.pipe(take(1), map((currentArray) => currentArray.filter((u) => u.id !== id )))))
      .subscribe({
        next: (updatedArray) => this._users$.next(updatedArray)
      })
  }
    
}
