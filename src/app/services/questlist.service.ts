import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Objective, Quest, questType} from '../shared/quest.model'

@Injectable({
  providedIn: 'root'
})
export class QuestlistService {
  questListChanges = new Subject<Quest[]>()
  questSelected = new Subject<Quest>()

  private quests: Quest[] = []

  constructor() { }

  getQuests() {
    return this.quests.slice()
  }

  getQuest(id: number) {
    return this.quests[id]
  }

  updateQuest(id: number, quest:Quest) {
    this.quests[id] = quest;
    this.quests[id].questCreationTime = new Date().getTime()
    this.questListChanges.next(this.quests.slice());
  }

  setQuests(quests: Quest[]) {
    this.quests = quests
    this.questListChanges.next(this.quests.slice())
  }

  addQuest(questform: QuestForm ){
    let quest = new Quest(questform.questName, questform.questType, questform.questDescription, new Date().getTime(), questform.questObjectives)
    this.quests.push(quest)
    this.questListChanges.next(this.quests.slice());
  }

  deleteQuest(id: number) {
    this.quests.splice(id,1)
    this.questListChanges.next(this.quests.slice())
  }
}

export interface QuestForm {
  questName: string;
  questType: questType;
  questDescription: string;
  questObjectives: Objective[]
}
