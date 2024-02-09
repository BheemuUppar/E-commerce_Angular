import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { StorageService } from './services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  let storageService = inject(StorageService);
  let token = storageService.getJsonValue('token');
  if (token) {
    return true;
  } else {
    alert('please login to continue');
    return false;
  }
};
