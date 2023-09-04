import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { User } from './models';
import { UserService } from './user.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  
  public users: Observable<User[]>;
  public isLoading$: Observable<boolean>
  public isAdmin$: Observable<boolean>

  constructor(private matDialog: MatDialog, private userService: UserService, private notifier: NotifierService, private store: Store) {
    
    this.userService.loadUsers()
    this.users = this.userService.getUsers()
    this.isLoading$ = userService.isLoading$
    this.isAdmin$ = this.store.select(selectIsAdmin)
  }

  onCreateUser(): void {
    const dialogRef = this.matDialog.open(UserFormDialogComponent)

    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if (v){
          this.userService.createUser({
              name: v.name,
              email: v.email,
              password: v.password,
              surname: v.surname,
              phone: v.phone,
              token: v.token,
              role: v.role
            });
        }
      }
    })
  }

  onDeleteUser(userToDelete: User): void {
    if (confirm(`¿Esta seguro de eliminar a ${userToDelete.name}?`)) {
      this.userService.deleteUserByID(userToDelete.id)
    }
  }

  userToEdit(userToEdit: User): void {
    const dialogRef = this.matDialog.open(UserFormDialogComponent, {
      data: userToEdit
    })

    dialogRef.afterClosed().subscribe({
      next: (userUpdated) => {
        if (userUpdated) {
          this.userService.updateUserByID(userToEdit.id, userUpdated)
        }
      }
    })
  }
}
