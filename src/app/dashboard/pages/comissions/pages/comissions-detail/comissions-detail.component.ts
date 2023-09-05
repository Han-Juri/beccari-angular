import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComissionsService } from '../../comissions.service';
import { Comission } from '../../models';
import { StudentService } from '../../../students/student.service';
import { StudentWithCourse } from '../../../students/models';

@Component({
  selector: 'app-comission-detail',
  templateUrl: './comissions-detail.component.html',
  styles: [],
})
export class ComissionDetailComponent implements OnInit {
  comissionId?: number;
  comission?: Comission;
  students?: StudentWithCourse[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private comissionService: ComissionsService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.comissionId = Number(this.activatedRoute.snapshot.params['id']);
    this.loadComission();
    this.loadStudentsInComission();
  }

  loadComission(): void {
    if (this.comissionId !== undefined) {
      this.comissionService.getComissionById(this.comissionId).subscribe((comission) => {
        this.comission = comission;
        this.loadStudentsInComission();
      });
    }
  }

  loadStudentsInComission(): void {
    if (this.comissionId !== undefined && this.comission) {
      this.studentService.getStudentsByComissionId(this.comission.courseId).subscribe((students) => {
        this.students = students;
      });
    }
  }
}