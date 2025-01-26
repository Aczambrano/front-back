import { DatePipe } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  imports: [DatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() headers: string[] = [];
  @Input() data: any[] = [];
  @Input() actions: { label: string, handler: (item: any) => void }[] = [];
  @Input() customClass: string = '';
  @Input() noDataMessage: string = "No hay datos para mostrar";


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      if (!this.data) {
        this.data = [];
      }
    }
    if (changes['headers']) {
        if (!this.headers) {
          this.headers = [];
        }
      }
      if (changes['actions']) {
        if (!this.actions) {
          this.actions = [];
        }
      }
  }

    onActionClick(handler: (item: any) => void, item: any) {
        if (handler) {
            handler(item);
        }
    }
}
