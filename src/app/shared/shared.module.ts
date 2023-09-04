import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule }  from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { FullNamePipe } from './pipes/full-name.pipe';
import { Encabezado20Directive } from './directives/encabezado20.directive';
import { MatSelectModule } from '@angular/material/select'


@NgModule({
  declarations: [
    FullNamePipe,
    Encabezado20Directive
  ],
  imports: [
    CommonModule
  ],
  exports: [
    Encabezado20Directive,
    FullNamePipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule
  ]
})
export class SharedModule { }
