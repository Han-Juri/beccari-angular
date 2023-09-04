import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {

  public isAdmin$: Observable<boolean>

  constructor(private store: Store){
    this.isAdmin$ = this.store.select(selectIsAdmin)
  }

  displayedColumns: string[] = ['fullName', 'email', 'phone', 'details', 'actions'];

  @Input()
  dataSource: User[] = []

  @Output()
  deleteUser = new EventEmitter<User>()
  @Output()
  editUser = new EventEmitter<User>()
}
