import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Product Management</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto">
          <li class="nav-item"><a class="nav-link" routerLink="/">Home</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/users">Users</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/categories">Categories</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/products">Products</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/bulk-upload">Bulk Upload</a></li>
          <li class="nav-item"><a class="nav-link" routerLink="/report">Reports</a></li>
        </ul>
      </div>
    </nav>
  `
})
export class NavbarComponent { }
