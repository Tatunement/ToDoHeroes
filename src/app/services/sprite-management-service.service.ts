import { Injectable } from '@angular/core';
import { characterSprites } from '../shared/sprites.model';

@Injectable({
  providedIn: 'root'
})
export class SpriteManagementService {

  constructor() { }

  spriteCreation(origin:string, color: string, playerclass:string):string {
    return characterSprites[origin][color][playerclass]
  }
}
