import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  form: FormGroup;
  editMode = false;
  editId: number | null = null;
  loading = false;

  constructor(private us: UserService, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['']
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.us.getUsers().subscribe(res => this.users = res.data);
  }

  async onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;

    const payload: any = { email: this.form.value.email };
    if (this.form.value.password) payload.password = this.form.value.password;

    try {
      if (this.editMode && this.editId) {
        await lastValueFrom(this.us.updateUser(this.editId, payload));
      } else {
        await lastValueFrom(this.us.createUser(payload));
      }
      this.form.reset();
      this.editMode = false;
      this.editId = null;
      this.loadUsers();
    } catch (err) {
      console.error(err);
      alert('Error saving user');
    } finally {
      this.loading = false;
    }
  }

  editUser(user: User) {
    this.form.patchValue({ email: user.email, password: '' });
    this.editMode = true;
    this.editId = user.id || null;
  }

  async deleteUser(id: number) {
    if (!confirm('Are you sure to delete?')) return;
    try {
      await lastValueFrom(this.us.deleteUser(id));
      this.loadUsers();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  }

  cancelEdit() {
    this.form.reset();
    this.editMode = false;
    this.editId = null;
  }
}
