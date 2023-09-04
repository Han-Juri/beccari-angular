import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentFormDialogComponent } from './components/student-form-dialog/student-form-dialog.component';
import { Student } from './models';
import { StudentService } from './student.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';
import { StudentActions } from './store/student.actions';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit{

  public students: Observable<Student[]>;
  public isAdmin$: Observable<boolean>

  constructor(private matDialog: MatDialog, private studentService: StudentService, private notifier: NotifierService, private store: Store) {
    
    this.studentService.loadStudents()
    this.students = this.studentService.getStudents()
    this.isAdmin$ = this.store.select(selectIsAdmin)
  }

  ngOnInit(): void {
    this.store.dispatch(StudentActions.loadStudents())
  }

  onCreateStudent(): void {
    const dialogRef = this.matDialog.open(StudentFormDialogComponent)

    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if (v){
          this.studentService.createStudent({
              name: v.name,
              email: v.email,
              password: v.password,
              surname: v.surname,
              phone: v.phone,
              courseId: v.comissionId
            });
        }
      }
    })
  }

  onDeleteStudent(studentToDelete: Student): void {
    if (confirm(`¿Esta seguro de eliminar a ${studentToDelete.name}?`)) {
      this.studentService.deleteStudentById(studentToDelete.id)
    }
  }

  studentToEdit(studentToEdit: Student): void {
    const dialogRef = this.matDialog.open(StudentFormDialogComponent, {
      data: studentToEdit
    })

    dialogRef.afterClosed().subscribe({
      next: (studentUpdated) => {
        if (studentUpdated) {
          this.studentService.updateStudentById(studentToEdit.id, studentUpdated)
        }
      }
    })
  }

}
