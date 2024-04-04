import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export default class ForgetPasswordComponent {
  forgetForm !: FormGroup;
  fb = inject(FormBuilder);

  ngOnInIt() : void {
    this.forgetForm = this.fb.group({
      email: ['',Validators.compose([Validators.required,Validators.email])]
    });
  }

  submit(){
    console.log(this.forgetForm.value);
  }

}
