import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PlayerCharacter } from '../shared/player.model';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  player: PlayerCharacter = new PlayerCharacter(
    '',
    '',
    '',
    '',
    0,
    0,
    0,
    0,
    { strenght: 0, agility: 0, vitality: 0, wiseness: 0 },
    [],
    []
  );

  playerChanges = new BehaviorSubject<PlayerCharacter>(null);

  constructor() {}

  get maxHp() {
    return Math.floor(this.player.abilityScores.vitality / 1.5);
  }

  setPlayer(player: PlayerCharacter) {
    console.log(player);
    this.player = player;
    this.playerChanges.next(this.player);
  }

  createPlater(player: PlayerCharacter) {
    console.log(player);
    this.player = player;
    this.playerChanges.next(this.player);
  }

  addExperience(experience: number) {
    this.player.experience += experience;
    this.handleLevelUp();
  }

  private handleLevelUp() {
    let levelUpRequired = 150 * Math.pow(1 + 1.1, this.player.level);
    if (this.player.experience >= levelUpRequired) {
      this.player.level += 1;
      this.player.experience = 0;
    }
    this.playerChanges.next(this.player);
  }
}
