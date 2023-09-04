import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models';
import { Store } from '@ngrx/store';
import { StudentActions } from '../../store/student.actions';
import { Observable } from 'rxjs';
import { Course } from '../../../courses/models';
import { selectCourseOptions } from '../../store/student.selectors';

@Component({
  selector: 'app-student-form-dialog',
  templateUrl: './student-form-dialog.component.html',
  styleUrls: ['./student-form-dialog.component.scss']
})
export class StudentFormDialogComponent implements OnInit{
  editingStudent?: Student
  nameControl = new FormControl<string | null>(null, [Validators.required])
  surnameControl = new FormControl<string | null>(null, [Validators.required])
  emailControl = new FormControl<string | null>(null, [Validators.required])
  passwordControl = new FormControl<string | null>(null, [Validators.required])
  phoneControl = new FormControl<string | null>(null, [Validators.required])
  courseIdControl = new FormControl<number | null>(null, [Validators.required])

  studentForm = new FormGroup ({
    name: this.nameControl,
    surname: this.surnameControl,
    email: this.emailControl,
    password: this.passwordControl,
    phone: this.phoneControl,
    courseId: this.courseIdControl
  })

  courseOptions$: Observable<Course[]>

  constructor(private store: Store, private dialogRef: MatDialogRef<StudentFormDialogComponent>,
      @Inject(MAT_DIALOG_DATA) private data?: Student) {
       if (this.data) {
        this.editingStudent = this.data
        this.nameControl.setValue(this.data.name)
        this.surnameControl.setValue(this.data.surname)
        this.emailControl.setValue(this.data.email)
        this.passwordControl.setValue(this.data.password)
        this.phoneControl.setValue(this.data.phone)
        this.courseIdControl.setValue(this.data.courseId)
       }
      this.courseOptions$ = this.store.select(selectCourseOptions)
  }

  ngOnInit(): void {
    this.store.dispatch(StudentActions.loadCourseOptions())
  }

  onSubmit(): void {
    
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched()
    } else {
      this.dialogRef.close(this.studentForm.value)
      
      setTimeout(() => {
        window.location.reload();
      }, 100)
    }
  }
}
