import { Component, OnInit, ViewChild, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { UserWallet } from '../models/user-wallet';
import { TransferCoinsService } from '../services/charge.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../services/user-info.service';
import { ChargeModalComponent } from '../charge/charge.component';
import { viewUserDetailModalComponent } from '../userDetail/user-detail.component';
import { Paginator } from 'primeng/components/paginator/paginator';
import { Table } from 'primeng/components/table/table';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminHomeComponent implements OnInit {
  @ViewChild('dataTable') dataTable: Table;
  @ViewChild('paginator') paginator: Paginator;

  @ViewChild('chargeModal') chargeModal: ChargeModalComponent;
  @ViewChild('viewUserDetailModal') viewUserDetailModal: viewUserDetailModalComponent;

  @Output() editInforAttribute: EventEmitter<number> = new EventEmitter<number>();

  userWallet: UserWallet;
  listUser: UserWallet[];
  listTransaction = [];
  listCharging = [];
  successfulList: String;
  balanceAvailable: Number;
  realBalance: Number;
  amount: Number;
  receiver: String;
  walletId: String;
  isShow = true;
  isDisplay = true;
  coinBase = "Coin Base";
  constructor(private router: Router, private userInfo: UserInfoService) {
    this.userWallet = JSON.parse(localStorage.getItem("userWallet"));
  }

  ngOnInit() {
    this.getListTransaction();
    this.getAllUsers();
  }

  logout() {
    localStorage.removeItem("userWallet");
    this.router.navigate([""]);
  }

  getAllUsers(): void {
    this.userInfo.showAllUsers()
      .subscribe(listUsers => this.listUser = listUsers);
  }

  openChargeModal(walletId: String): void {
    this.chargeModal.show(walletId);
  }

  openViewDetailModal(id: String): void {
    this.viewUserDetailModal.show();
    this.viewUserDetailModal.getUserDetail(id);
  }

  getUserDetail(walletId: String): void {
    this.userInfo.showUserDetail(walletId)
      .subscribe(userWallet => { this.userWallet = userWallet });
  }

  getSuccessfulList() {
    this.isShow = !this.isShow;
    this.userInfo.getSuccessfulList("Coin Base")
      .subscribe(succesfulList => { this.successfulList = succesfulList });
  }

  getListTransaction() {
    this.userInfo.getListTransaction()
      .subscribe(result => { this.listTransaction = result });
  }

  updateHistory() {
    this.userInfo.getChargingList()
      .subscribe(result => { this.listCharging = result });
  }

  getChargingList() {
    this.isDisplay = !this.isDisplay;
    this.userInfo.getChargingList()
      .subscribe(result => { this.listCharging = result });
  }
}
