export type questType = "Daily" | "Weekly" | "Monthly"

export class Objective {
  constructor (public name: string, public amount: number, public status: boolean) {}
}

export class Quest {
  constructor(public questName: string, public questType:questType,  public questDescription: string, public questCreationTime: number, public questObjectives: Objective[]) {}
}
