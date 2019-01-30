import { Component, OnInit } from '@angular/core';
import { UserWallet } from '../models/user-wallet';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  userWallet: UserWallet;
  constructor() {
    this.userWallet = JSON.parse(localStorage.getItem("userWallet"));
   }

  ngOnInit() {
  }

}
