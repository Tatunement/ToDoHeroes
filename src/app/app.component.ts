import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { DataStorageService } from './services/data-storage.service';
import { PlayerCharacter } from './shared/player.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  subscription: Subscription

  constructor(private dataStorage: DataStorageService, private AuthService: AuthService) {}

  ngOnInit() {
    this.subscription = this.AuthService.user.subscribe(
      (user) => {
        if (user) {
          setInterval(() => {
            this.dataStorage.savePlayer();
          }, 120000);
        }
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
