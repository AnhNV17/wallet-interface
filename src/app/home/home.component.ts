import { Component, OnInit } from '@angular/core';
import { UserWallet } from '../models/user-wallet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userWallet: UserWallet;
  constructor() {
    this.userWallet = JSON.parse(localStorage.getItem("userWallet"));
   }

  ngOnInit() {
  }

}
