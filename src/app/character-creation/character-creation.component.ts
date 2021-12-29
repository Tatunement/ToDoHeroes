import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../services/data-storage.service';
import { PlayerService } from '../services/player.service';
import { SpriteManagementService } from '../services/sprite-management-service.service';
import { AbilityScores, PlayerCharacter } from '../shared/player.model';

@Component({
  selector: 'app-character-creation',
  templateUrl: './character-creation.component.html',
  styleUrls: ['./character-creation.component.css'],
})
export class CharacterCreationComponent implements OnInit, OnDestroy {
  creationForm: FormGroup;
  private subscription = new Subscription();
  selectedOrigin: string = 'caucasian';
  selectedColor: string = 'red';
  selectedClass: string = 'warrior';
  characterSprite: string;
  abilityScores: AbilityScores = {
    strenght: 0,
    vitality: 0,
    agility: 0,
    wiseness: 0,
  };
  points: number = 36;

  constructor(private spriteManager: SpriteManagementService, private playerService: PlayerService, private dataStorage: DataStorageService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
    this.subscription.add(
      this.creationForm.get('origin').valueChanges.subscribe((value) => {
        this.selectedOrigin = value;
        this.characterSprite = this.spriteManager.spriteCreation(
          this.selectedOrigin,
          this.selectedColor,
          this.selectedClass
        );
        console.log(this.characterSprite);
      })
    );
    this.subscription.add(
      this.creationForm.get('color').valueChanges.subscribe((value) => {
        this.selectedColor = value;
        this.characterSprite = this.spriteManager.spriteCreation(
          this.selectedOrigin,
          this.selectedColor,
          this.selectedClass
        );
      })
    );
    this.subscription.add(
      this.creationForm
        .get('playerclass')
        .valueChanges.subscribe((value: string) => {
          this.selectedClass = value;
          this.characterSprite = this.spriteManager.spriteCreation(
            this.selectedOrigin,
            this.selectedColor,
            this.selectedClass
          );
          this.classHandler(value);
        })
    );
  }

  private initForm() {
    let name = '';
    let origin = 'caucasian';
    let playerClass = 'warrior';
    let color = 'red';

    this.creationForm = new FormGroup({
      name: new FormControl(name, [Validators.required]),
      origin: new FormControl(origin, [Validators.required]),
      playerclass: new FormControl(playerClass, [Validators.required]),
      color: new FormControl(color, [Validators.required]),
    });
  }

  onSubmit() {
    this.creationHandler(this.creationForm.value)
  }

  private creationHandler(completedForm: characterForm) {
    let currentHp = Math.floor(this.abilityScores.vitality / 1.5);
    this.classHandler(this.selectedClass)
    this.playerService.setPlayer(
      new PlayerCharacter(completedForm.name, completedForm.color, completedForm.origin, this.characterSprite, 1, currentHp, 0, 0, this.abilityScores, [], [])
    )
    this.dataStorage.savePlayer()
    this.router.navigate(['/questlist'])
  }

  onPlusButton(ability: string) {
    if (!this.points) {
      return;
    }
    this.points--;
    this.abilityScores[ability]++;
  }

  onMinusButton(ability: string) {
    if (this.points === 36) {
      return;
    }
    this.points++;
    this.abilityScores[ability]--;
  }

  classHandler(playerClass: string) {
    switch (playerClass) {
      case "warrior":
        this.abilityScores.strenght = this.abilityScores.strenght + 2;
        break;
      case "wizard":
        this.abilityScores.wiseness = this.abilityScores.wiseness + 2;
        break
      case "rogue":
        this.abilityScores.agility = this.abilityScores.agility + 2;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

export interface characterForm {
  name: string;
  origin: string;
  class: string;
  color: string;
}
