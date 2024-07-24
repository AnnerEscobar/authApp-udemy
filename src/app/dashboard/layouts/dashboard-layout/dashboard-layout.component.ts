import { Component, computed, inject } from '@angular/core';
import { AuthServiceService } from '../../../auth/services/auth-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {
  private userService = inject(AuthServiceService);

  public user = computed(()=> this.userService.currentUser());

/*   get user(){
    return this.userService.currentUser();
  } */
}
