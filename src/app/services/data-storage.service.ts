import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlayerCharacter } from '../shared/player.model';
import { PlayerService } from './player.service';
import { map, take, tap } from 'rxjs/operators';
import { QuestlistService } from './questlist.service';
import { Quest } from '../shared/quest.model';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  userId: string = '';
  subscription: Subscription;

  constructor(
    private http: HttpClient,
    private playerService: PlayerService,
    private QLService: QuestlistService,
    private authService: AuthService
  ) {}

  savePlayer() {
    this.subscription = this.authService.user.subscribe((user: User) => {
      if (user != null) {
        this.userId = user.id;
      } else {
        this.userId = 'PlayerId';
      }
    });
    const player = this.playerService.player;
    this.http
      .put(
        `https://to-do-heroes-default-rtdb.europe-west1.firebasedatabase.app/${this.userId}.json`,
        player
      )
      .subscribe((response) => console.log(response));
    this.subscription.unsubscribe();
  }

  saveQuests(quests: Quest[]) {
    this.subscription = this.authService.user.subscribe((user: User) => {
      if (user != null) {
        this.userId = user.id;
      } else {
        this.userId = 'PlayerId';
      }
    });
    this.http
      .put(
        `https://to-do-heroes-default-rtdb.europe-west1.firebasedatabase.app/${this.userId}/questList.json`,
        quests
      )
      .subscribe((response) => console.log(response));
    this.subscription.unsubscribe();
  }

  fetchPlayer() {
    this.subscription = this.authService.user.subscribe((user: User) => {
      if (user != null) {
        this.userId = user.id;
      } else {
        this.userId = 'PlayerId';
      }
    });
    this.http
      .get<PlayerCharacter>(
        `https://to-do-heroes-default-rtdb.europe-west1.firebasedatabase.app/${this.userId}.json`
      )
      .subscribe((data) => {
        this.playerService.setPlayer(data);
      });
    this.subscription.unsubscribe();
  }

  fetchQuest() {
    this.subscription = this.authService.user.subscribe((user: User) => {
      if (user != null) {
        this.userId = user.id;
      } else {
        this.userId = 'PlayerId';
      }
    });
    return this.http
      .get<Quest[]>(
        `https://to-do-heroes-default-rtdb.europe-west1.firebasedatabase.app/${this.userId}/questList.json`
      )
      .pipe(
        map((quests) => {
          return quests.map((quest: Quest) => {
            return {
              ...quest,
              questObjectives: quest.questObjectives
                ? quest.questObjectives
                : [],
            };
          });
        }),
        tap((quests) => {
          this.QLService.setQuests(quests);
          this.subscription.unsubscribe();
        })
      );
  }
}
