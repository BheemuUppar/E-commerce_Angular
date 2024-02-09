import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  searchMode = new BehaviorSubject({mode:false, searchText:''});
  searchMode$ = this.searchMode.asObservable();
  constructor() {}
}
