import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Comission } from '../../models';

@Component({
  selector: 'app-comissions-dialog-form',
  templateUrl: './comissions-dialog-form.component.html',
  styleUrls: ['./comissions-dialog-form.component.scss']
})
export class ComissionsDialogFormComponent {
  editingComission?: Comission
  courseControl = new FormControl<string | null>(null, [Validators.required])
  courseIdControl = new FormControl<Number | null>(null, [Validators.required])
  teacherControl = new FormControl<string | null>(null, [Validators.required])
  dateControl = new FormControl<string | null>(null, [Validators.required])

  comissionForm = new FormGroup ({
    course: this.courseControl,
    courseId: this.courseControl,
    teacher: this.teacherControl,
    date: this.dateControl,
  })

  constructor(private dialogRef: MatDialogRef<ComissionsDialogFormComponent>,
      @Inject(MAT_DIALOG_DATA) private data?: Comission,) {
       if (this.data) {
        this.editingComission = this.data
        this.courseControl.setValue(this.data.course.name)
        this.courseIdControl.setValue(this.data.course.id)
        this.teacherControl.setValue(this.data.course.teacher)
        this.dateControl.setValue(this.data.course.date)
       }
  }

  onSubmit(): void {
    
    if (this.comissionForm.invalid) {
      this.comissionForm.markAllAsTouched()
    } else {
      this.dialogRef.close(this.comissionForm.value)
    }
  }
}
