import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComissionsComponent } from './comissions.component';
import { ComissionsTableComponent } from './components/comissions-table/comissions-table.component';
import { ComissionDetailComponent } from './pages/comissions-detail/comissions-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComissionsDialogFormModule } from './components/comissions-dialog-form/comissions-dialog-form.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ComissionsComponent,
    ComissionsTableComponent,
    ComissionDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComissionsDialogFormModule,
    RouterModule
  ],
  exports: [
    ComissionsComponent
  ]
})
export class ComissionsModule { }
