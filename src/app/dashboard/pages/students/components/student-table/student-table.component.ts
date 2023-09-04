import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student, StudentWithCourse } from '../../models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';
import { selectStudent } from '../../store/student.selectors';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent {

  studentWithCourse$: Observable<StudentWithCourse[]>
  public isAdmin$: Observable<boolean>

  constructor(private store: Store) {
    this.isAdmin$ = this.store.select(selectIsAdmin)
    this.studentWithCourse$ = this.store.select(selectStudent)
  }

  displayedColumns: string[] = ['fullName', 'email', 'phone', 'course', 'details', 'actions'];

  @Input()
  dataSource: Student[] = []

  @Output()
  deleteStudent = new EventEmitter<Student>()
  @Output()
  editStudent = new EventEmitter<Student>()
}
