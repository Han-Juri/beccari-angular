import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { User } from './pages/users/models';
import { Store } from '@ngrx/store';
import { selectAuthUser, selectIsAdmin } from '../store/auth/auth.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  showFiller = false;

  public authUser$: Observable<User | null>
  public selectIsAdmin$: Observable<boolean>

  constructor(private router:Router, private authService: AuthService, private store: Store) {
    this.authUser$ = this.store.select(selectAuthUser)
    this.selectIsAdmin$ = this.store.select(selectIsAdmin)
  }

  logout(): void {
    this.authService.logout
    this.router.navigate(['auth', 'login'], {})
    localStorage.removeItem('token')
  }  



}
