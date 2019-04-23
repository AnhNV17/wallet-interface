import { Component, OnInit, QueryList } from '@angular/core';
import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router'
import Swal from 'sweetalert2';

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

  validateLogin() {
    if (this.username && this.password) {
      this.loginService.validateLogin(this.username, this.password)
        .subscribe(userWallet => {
          if (userWallet.role === "user") {
            localStorage.setItem("userWallet", JSON.stringify(userWallet));
            this.router.navigate(['home']);
          } else if (userWallet.role === "admin") {
            localStorage.setItem("userWallet", JSON.stringify(userWallet));
            this.router.navigate(['admin_home']);
          } else if (userWallet.role === "seller" || userWallet.role === "supplier") {
            localStorage.setItem("userWallet", JSON.stringify(userWallet));
            this.router.navigate(['requestList']);
            // } else if (userWallet.role === "supplier")  {
            //   localStorage.setItem("userWallet", JSON.stringify(userWallet));
            //   this.router.navigate(['supplier_home']);
          } else {
            Swal.fire({
              type: 'error',
              title: 'Username or Password is wrong'
            })
          }
        }, error => {
          Swal.fire({
            type: 'error',
            title: 'There is an error' + error
          })
        })
    } else {
      Swal.fire({
        type: 'error',
        title: 'Username or Password is wrong. Please enter again'
      })
    }
  }
}
