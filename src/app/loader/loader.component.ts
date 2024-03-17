import { ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
isloading=false;
  constructor(public loaderService:LoaderService, private cdr:ChangeDetectorRef) {
    this.loaderService.loaderSource$.subscribe((res)=>{
      this.isloading  =  res;
      this.cdr.detectChanges()

    })
  }

}
