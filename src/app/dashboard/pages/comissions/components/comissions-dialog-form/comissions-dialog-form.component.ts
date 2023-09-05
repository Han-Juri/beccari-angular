import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Comission } from '../../models';
import { Store } from '@ngrx/store';
import { ComissionActions } from '../../store/comission.actions';
import { Observable } from 'rxjs';
import { Course } from '../../../courses/models';
import { selectCourseOptions } from '../../store/comission.selectors';

@Component({
  selector: 'app-comissions-dialog-form',
  templateUrl: './comissions-dialog-form.component.html',
  styleUrls: ['./comissions-dialog-form.component.scss']
})
export class ComissionsDialogFormComponent implements OnInit{
  editingComission?: Comission

  courseIdControl = new FormControl<Number | null>(null, [Validators.required])

  comissionForm = new FormGroup ({
    courseId: this.courseIdControl,
  })

  courseOptions$: Observable<Course[]>

  constructor(private dialogRef: MatDialogRef<ComissionsDialogFormComponent>, private store: Store,
      @Inject(MAT_DIALOG_DATA) private data?: Comission,) {
       if (this.data) {
        this.editingComission = this.data
        this.courseIdControl.setValue(this.data.courseId)
       }
       this.courseOptions$ = this.store.select(selectCourseOptions)
  }

  ngOnInit(): void {
    this.store.dispatch(ComissionActions.loadCourseOptions())
  }

  onSubmit(): void {
    
    if (this.comissionForm.invalid) {
      this.comissionForm.markAllAsTouched()
    } else {
      this.dialogRef.close(this.comissionForm.value)
      
      setTimeout(() => {
        window.location.reload();
      }, 100)
    }
  }
}
