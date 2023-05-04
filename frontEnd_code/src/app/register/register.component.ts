import { Component } from '@angular/core';
import { getPeriodicElementFormUser } from '../shared/forms/user-elemet.form';
import { Router } from '@angular/router';
import { LoginService } from '../utils/login.service';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup = getPeriodicElementFormUser();

  constructor(private loginService:LoginService, private router:Router, private snackBar :MatSnackBar){}


  async save(user: any) {
    this.loginService.register(user).subscribe((result:any) => {
      console.log('Sikeres regisztracio!');
      this.openSnack('Sikeres regisztracio!', 'OK');
      this.router.navigate(['/login']);
    }, error => {
      console.log('Hiba tortent a regisztracio soran!', error);
      this.openSnack('Hiba tortent a regisztracio soran!', 'HIBA');
    });
  }

  openSnack(message: string, action: string){
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
