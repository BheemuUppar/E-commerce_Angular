import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { StorageService } from 'src/app/services/storage.service';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.commonService.searchMode$.subscribe((data) => {
      this.mode = data.mode;
    });

    this.username = this.storageService.getJsonValue('username');
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
}
