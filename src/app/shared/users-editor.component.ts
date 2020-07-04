import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UserData} from '../../models/user.model';
import {CreateUserComponent} from './create-user.component';
import {NbWindowService} from '@nebular/theme';

@Component({
  selector: 'dash-users-editor',
  templateUrl: './users-editor.component.html',
  styleUrls: ['./users-editor.component.scss']
})
export class UsersEditorComponent implements OnInit {
  public users: UserData[] = undefined;
  public loading: number[] = [];

  constructor(private authService: AuthService,
              private windowService: NbWindowService) {}

  ngOnInit() {
    this.authService.getAllUsers().then((res) => {
      this.users = res;
    });
  }

  async setAdmin(user: UserData, index: number): Promise<void> {
    this.loading.push(index);
    if (!user.admin)
      await this.authService.addAdmin(user.uid);
    else
      await this.authService.removeAdmin(user.uid);
    user.admin = !user.admin;
    this.loading.splice(this.loading.indexOf(index), 1);
  }

  openCreateUserDialog() {
    this.windowService.open(CreateUserComponent, {title: 'Create user'})
  }

  async deleteUser(user: UserData, index: number): Promise<void> {
    this.loading.push(index);
    try {
      await this.authService.removeUser(user.uid);
      this.users.splice(index, 1);
    } catch (e) {
      console.warn(e);
    }
    this.loading.splice(this.loading.indexOf(index), 1);
  }
}
