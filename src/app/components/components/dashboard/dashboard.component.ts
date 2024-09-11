import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model';
import { UsersComponent } from "./users/users.component";
type Users = { users: User[] };

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [UsersComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  users: User[] = [];

  constructor(private activatedRoute: ActivatedRoute) {}

  //users = input.required<User[]>();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data) => {
        this.users = (data as Users).users;
        //console.log(data);
      },
    });
    //this.users = this.activatedRoute.snapshot.data['users'];
  }

  // fetchUserList() {
  //   this.subscription.add(
  //     this.userService.getUserList().subscribe({
  //       next: (user: User[]) => {
  //         this.users = user;
  //         console.log(this.users);
  //       },
  //       error: () => {},
  //     })
  //   );
  // this.userService.getUserList().subscribe((user) => {
  //   this.users = user;
  // });
  //}
  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
}
