import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
loader = new BehaviorSubject(false);
loaderSource$  = this.loader.asObservable();
  constructor() { }


  show(){
    this.loader.next(true)
  }
  hide(){
    this.loader.next(false)
  }
}
