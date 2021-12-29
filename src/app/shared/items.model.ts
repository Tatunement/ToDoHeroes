export type itemType = 'MainHand' | 'Armor' | 'OffHand' | 'Helmet' | 'Consumable';

export interface Modifiers {
  strenghtModifier?: number;
  vitalityModifier?: number;
  agilityModifier?: number;
  intelligenceModifier?: number;
}

export class Item {
  constructor(
    public name: string,
    public type: itemType,
    public modifiers: Modifiers,
    public description: string,
    public isInInventory: boolean,
    public cost: number,
    public duration?: number
  ) {}
}
