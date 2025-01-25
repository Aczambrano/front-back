import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sumary-card',
  imports: [],
  templateUrl: './sumary-card.component.html',
  styleUrl: './sumary-card.component.scss'
})
export class SumaryCardComponent {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() description: string = '';
  @Input() image: string = '';
  @Input() icon: string = '';
  @Input() imageType: 'image' | 'icon' = 'image'

  isNumber(value: string | number): boolean {
    return typeof value === 'number';
  }
}
