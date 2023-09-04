import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentFormDialogModule } from './components/student-form-dialog/student-form-dialog.module';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { RouterModule } from '@angular/router';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';
import { EffectsModule } from '@ngrx/effects';
import { StudentEffects } from './store/student.effects';
import { StoreModule } from '@ngrx/store';
import { studentFeature } from './store/student.reducer';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentTableComponent,
    StudentDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StudentFormDialogModule,
    RouterModule,
    StoreModule.forFeature(studentFeature),
    EffectsModule.forFeature([StudentEffects])
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }
