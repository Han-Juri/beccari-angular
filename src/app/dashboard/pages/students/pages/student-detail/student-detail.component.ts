import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentWithCourse } from '../../models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectStudent } from '../../store/student.selectors';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styles: [
  ]
})
export class StudentDetailComponent implements OnInit {

  public studentId?: number;
  public student?: StudentWithCourse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.studentId = Number(this.activatedRoute.snapshot.params['id']);

    this.store.select(selectStudent).subscribe((students) => {
      this.student = students.find((s) => s.id === this.studentId);
    });
  }

}
