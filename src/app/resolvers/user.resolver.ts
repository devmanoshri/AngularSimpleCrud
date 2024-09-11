import { ResolveFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { Subscription, catchError, of } from 'rxjs';
import { User } from '../models/user.model';

export const userResolver: ResolveFn<User[] | null> = (route, state) => {
  const userService = inject(UserService);
  return userService.getUserList();
};
