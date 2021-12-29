import { Component} from '@angular/core';
import { Subscription } from 'rxjs';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  status:boolean = false
  subscription:Subscription

  constructor(private navbarService: NavbarService) { }

  clickEvent() {
    this.status = !this.status;
    this.navbarService.statusChanged.next(this.status)
  }
}
