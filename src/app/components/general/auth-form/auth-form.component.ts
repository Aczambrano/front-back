import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FieldLogin } from '../../../interfaces/fields-login.interface';

@Component({
  selector: 'app-auth-form',
  imports : [ReactiveFormsModule] ,
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent {
  @Input() title!: string;
  @Input() formGroup!: FormGroup;
  @Input() submitButtonLabel!: string;
  @Input() linkText!: string;
  @Input() linkAction!: () => void;
  @Input() errorMessage!: string | null;
  @Input() fields!: FieldLogin[];

  @Output() formSubmit = new EventEmitter<void>();

  errorKeysByField: { [key: string]: string[] } = {}; 

  ngOnChanges(): void {
        this.fields.forEach(field => {
            if(field.errorMessages)
                this.errorKeysByField[field.controlName] = Object.keys(field.errorMessages)
        })
  }

  onFormSubmit(): void {
    this.formSubmit.emit();
  }


    onLinkAction() {
      if(this.linkAction){
        this.linkAction();
      }
    }

  
}