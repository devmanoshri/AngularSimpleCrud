import { Component, input } from '@angular/core';
import { User } from '../../../../models/user.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  userList = input.required<User[]>();
}
