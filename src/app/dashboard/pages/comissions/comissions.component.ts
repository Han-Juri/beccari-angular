import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComissionsDialogFormComponent } from './components/comissions-dialog-form/comissions-dialog-form.component';
import { Comission } from './models';
import { ComissionsService } from './comissions.service';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comissions',
  templateUrl: './comissions.component.html',
  styleUrls: ['./comissions.component.scss']
})
export class ComissionsComponent {

  public comissions: Observable<Comission[]>;

  constructor(private matDialog: MatDialog, private comissionService: ComissionsService, private notifier: NotifierService) {
    
    this.comissionService.loadComissions()
    this.comissions = this.comissionService.getComissions()
  }

  onCreateComission(): void {
    const dialogRef = this.matDialog.open(ComissionsDialogFormComponent)

    dialogRef.afterClosed().subscribe({
      next: (v) => {
        if (v){
          this.comissionService.createComission({
              id: v.id,
              course: v.course
            });
        }
      }
    })
  }

  onDeleteComission(comissionToDelete: Comission): void {
    if (confirm(`¿Esta seguro de eliminar a ${comissionToDelete.course}?`)) {
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
