import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-account-info',
  imports: [],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.scss'
})
export class AccountInfoComponent {
  @Input() title: string = '';
  @Input() image: string = '';
  @Input() imageType: 'image' | 'icon' | 'none' = 'none';
  @Input() icon: string = '';
  @Input() details: { label: string, value: string }[] = [];
  @Input() actions: { label: string, handler: () => void }[] = [];
  @Input() customClass: string = '';
  @Input() showActions: boolean = true;
  
  @Output() editClicked = new EventEmitter<void>();
  @Output() transactionClicked = new EventEmitter<void>();


    ngOnChanges(changes: SimpleChanges): void {
        if (changes['details']) {
            if (!this.details) {
              this.details = [];
            }
          }
          if (changes['actions']) {
            if (!this.actions) {
              this.actions = [];
            }
          }
          
    }

    onActionClick(handler: () => void) {
      if(handler) {
        handler();
      }
    }
}
