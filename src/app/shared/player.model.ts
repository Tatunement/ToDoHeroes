import { Item } from "./items.model";
import { Quest } from "./quest.model";

export interface AbilityScores {
  strenght: number;
  agility: number;
  vitality: number;
  wiseness: number;
}

export class PlayerCharacter {
  constructor(
    public name: string,
    public color: string,
    public origin: string,
    public sprite: string,
    public level: number,
    public currentHP: number,
    public coins: number,
    public experience: number,
    public abilityScores: AbilityScores,
    public questList: Quest[],
    public inventory: Item[],
    public onlineMode?: boolean
  ) {}
}
