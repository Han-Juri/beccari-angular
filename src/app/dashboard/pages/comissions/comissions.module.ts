import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComissionsComponent } from './comissions.component';
import { ComissionsTableComponent } from './components/comissions-table/comissions-table.component';
import { ComissionDetailComponent } from './pages/comissions-detail/comissions-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComissionsDialogFormModule } from './components/comissions-dialog-form/comissions-dialog-form.module';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ComissionEffects } from './store/comission.effects';
import { StoreModule } from '@ngrx/store';
import { comissionFeature } from './store/comission.reducer';



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
    RouterModule,
    StoreModule.forFeature(comissionFeature),
    EffectsModule.forFeature([ComissionEffects])
  ],
  exports: [
    ComissionsComponent
  ]
})
export class ComissionsModule { }
