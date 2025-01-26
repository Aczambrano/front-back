import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss'
})
export class AuthFormComponent {
  @Input() title: string = '';
  @Input() linkText: string = '';
    @Input() linkButtonText: string = '';
  @Input() errorMessage: string | null = null;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() changeView = new EventEmitter<void>();


  onSubmit(event: Event) {
        event.preventDefault();
        const form = (event.target as HTMLFormElement);
        const formData = new FormData(form);
        const formValues: { [key: string]: any } = {};
        formData.forEach((value, key) => {
            formValues[key] = value;
        });

        this.formSubmit.emit(formValues);
  }
    onChangeView(){
        this.changeView.emit()
    }

}