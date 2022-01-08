import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Quest } from '../shared/quest.model';
import { DataStorageService } from './data-storage.service';
import { QuestlistService } from './questlist.service';

@Injectable({
  providedIn: 'root'
})
export class QuestResolverService implements Resolve<Quest[]> {

  constructor(private dataStorage: DataStorageService, private QLService: QuestlistService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const quests = this.QLService.getQuests()

    if (quests.length === 0) {
      return this.dataStorage.fetchQuest()
    } else {
      return quests
    }
  }
}
