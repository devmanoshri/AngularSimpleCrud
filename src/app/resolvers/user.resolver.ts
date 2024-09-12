import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

export const userResolver: ResolveFn<User[] | null> = (route, state) => {
  const userService = inject(UserService);
  return userService.getUserList();
};
