import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  mode!: boolean;
  searchText: string = '';
  username: string | undefined;
  constructor(
    private commonService: CommonService,
    private storageService: StorageService,
    private router: Router,
    private userService:UserService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.commonService.searchMode$.subscribe((data) => {
      this.mode = data.mode;
    });
    this.username = this.storageService.getJsonValue('username');
this.userService.authSource.subscribe((res)=>{
  this.username = this.storageService.getJsonValue('username');
  console.log('username ',this.username)
})
  }

  setMode(mode: boolean) {
    this.commonService.searchMode.next({
      mode: mode,
      searchText: this.searchText,
    });
    if (!mode) {
      this.searchText = '';
    }
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }

  navigateTo(){
    this.router.navigateByUrl("/orders")
  }
  verifySession(){
    this.authService.verifySession().subscribe()
  }
}
