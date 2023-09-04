import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../models';

@Component({
  selector: 'app-courses-dialog-form',
  templateUrl: './courses-dialog-form.component.html',
  styleUrls: ['./courses-dialog-form.component.scss']
})
export class CoursesDialogFormComponent {
  editingCourse?: Course
  nameControl = new FormControl<string | null>(null, [Validators.required])
  teacherControl = new FormControl<string | null>(null, [Validators.required])
  dateControl = new FormControl<string | null>(null, [Validators.required])
  shiftControl = new FormControl<string | null>(null, [Validators.required])

  courseForm = new FormGroup ({
    name: this.nameControl,
    teacher: this.teacherControl,
    date: this.dateControl,
    shift: this.shiftControl
  })

  constructor(private dialogRef: MatDialogRef<CoursesDialogFormComponent>,
      @Inject(MAT_DIALOG_DATA) private data?: Course,) {
       if (this.data) {
        this.editingCourse = this.data
        this.nameControl.setValue(this.data.name)
        this.teacherControl.setValue(this.data.teacher)
        this.dateControl.setValue(this.data.date)
        this.shiftControl.setValue(this.data.shift)
       }
  }

  onSubmit(): void {
    
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched()
    } else {
      this.dialogRef.close(this.courseForm.value)
    }
  }
}
