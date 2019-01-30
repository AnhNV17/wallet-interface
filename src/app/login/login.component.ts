import { Component, OnInit, QueryList } from '@angular/core';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
  }

  validateLogin(){
    if (this.username && this.password){
      this.loginService.validateLogin(this.username, this.password)
        .subscribe(userWallet => {
          if (userWallet.role === "user"){
            localStorage.setItem("userWallet", JSON.stringify(userWallet));
            this.router.navigate(['home']);
          } else if (userWallet.role === "admin") {
            localStorage.setItem("userWallet", JSON.stringify(userWallet));
            this.router.navigate(['admin_home']);
          } else {
            alert('Username or Password is wrong');
          }
        }, error => {
          alert('There is an error' +error);
        })
    } else {
      alert('Username or Password is wrong. Please enter again')
    }
  }
}
