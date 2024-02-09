import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setJsonValue(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getJsonValue(key: string) {
    let value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return value;
    }
  }
}
