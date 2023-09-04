import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent {

  public isAdmin$: Observable<boolean>

  constructor(private store: Store){
    this.isAdmin$ = this.store.select(selectIsAdmin)
  }

  displayedColumns: string[] = ['fullName', 'teacher', 'date', 'shift', 'actions'];

  @Input()
  dataSource: Course[] = []

  @Output()
  deleteCourse = new EventEmitter<Course>()
  @Output()
  editCourse = new EventEmitter<Course>()
}
