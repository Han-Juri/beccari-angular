import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { User } from '../../models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [
  ]
})
export class UserDetailComponent implements OnInit {

  public userID?: number;
  public user?: User;
  public isAdmin$: Observable<boolean>

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private store: Store
  ) {
    this.isAdmin$ = this.store.select(selectIsAdmin)
  }

  ngOnInit(): void {
    this.userID = Number(this.activatedRoute.snapshot.params['id']);
    this.loadUser();
  }

  loadUser(): void {
    if (this.userID) {
      this.userService.getUserByID(this.userID).subscribe({
        next: (user) => {
          this.user = user;
        }
      });
    }
  }
}
