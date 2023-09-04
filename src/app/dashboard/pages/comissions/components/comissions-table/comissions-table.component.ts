import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comission } from '../../models';

@Component({
  selector: 'app-comissions-table',
  templateUrl: './comissions-table.component.html',
  styleUrls: ['./comissions-table.component.scss']
})
export class ComissionsTableComponent {
  displayedColumns: string[] = ['course', 'teacher', 'date', 'students', 'actions'];

  @Input()
  dataSource: Comission[] = []

  @Output()
  deleteComission = new EventEmitter<Comission>()
  @Output()
  editComission = new EventEmitter<Comission>()
}
