import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, RouterModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  
  authService = inject(AuthService);
  isLoggedIn: boolean = false;
  

  isProfileDropdownOpen: boolean = false;
  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(res => {
      this.isLoggedIn = res;

    })
  }
  logout() {
    localStorage.removeItem("user_id");
    this.authService.isLoggedIn$.next(false);
    this.isProfileDropdownOpen = false;
  }
}