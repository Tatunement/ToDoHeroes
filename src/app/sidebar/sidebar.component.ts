import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  status: boolean;
  subscription: Subscription;

  constructor(private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.subscription = this.navbarService.statusChanged.subscribe(
      (status: boolean) => this.status = status
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
