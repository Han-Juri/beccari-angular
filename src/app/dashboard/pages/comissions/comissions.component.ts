import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComissionsDialogFormComponent } from './components/comissions-dialog-form/comissions-dialog-form.component';
import { Comission, ComissionWithCourse } from './models';
import { ComissionsService } from './comissions.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ComissionActions } from './store/comission.actions';
import { selectComisions } from './store/comission.selectors';

@Component({
  selector: 'app-comissions',
  templateUrl: './comissions.component.html',
  styleUrls: ['./comissions.component.scss']
})
export class ComissionsComponent implements OnInit{

  public comissions$: Observable<ComissionWithCourse[]>;

  constructor(private matDialog: MatDialog, private comissionService: ComissionsService, private store: Store) {
    
    this.comissionService.loadComissions()
    this.comissions$ = this.store.select(selectComisions)
  }

  ngOnInit(): void {
    this.store.dispatch(ComissionActions.loadComissions())
  }

  onCreateComission(): void {
    const dialogRef = this.matDialog.open(ComissionsDialogFormComponent)

    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if (v){
          this.comissionService.createComission({
              id: v.id,
              courseId: v.courseId
            });
        }
      }
    })
  }

  onDeleteComission(comissionToDelete: Comission): void {
    if (confirm(`¿Esta seguro de eliminar a ${comissionToDelete}?`)) {
      this.comissionService.deleteComissionByID(comissionToDelete.id)
    }
  }

  comissionToEdit(comissionToEdit: Comission): void {
    const dialogRef = this.matDialog.open(ComissionsDialogFormComponent, {
      data: comissionToEdit
    })

    dialogRef.afterClosed().subscribe({
      next: (comissionUpdated) => {
        if (comissionUpdated) {
          this.comissionService.updateComissionByID(comissionToEdit.id, comissionUpdated)
        }
      }
    })
  }
}
