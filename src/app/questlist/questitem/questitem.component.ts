import { Component, Input, OnInit } from '@angular/core';
import { Quest } from 'src/app/shared/quest.model';

@Component({
  selector: 'app-questitem',
  templateUrl: './questitem.component.html',
  styleUrls: ['./questitem.component.css'],
})
export class QuestitemComponent implements OnInit {
  @Input() quest: Quest;
  @Input() index: number;

  constructor() {}

  ngOnInit(): void {}

  get questTimer() {
    let daily = 86400000;
    let weekly = 604800000;
    let creationTime = this.quest.questCreationTime;
    let now = new Date().getTime()
    let endTime: number;
    switch (this.quest.questType) {
      case 'Daily':
        endTime = creationTime + daily;
        break;
      case 'Weekly':
        endTime = creationTime + weekly;
        break;
    }
    let questTimerInMs = endTime - now;
    let timer: number
    if (questTimerInMs >= 86400000) {
      timer = Math.round(questTimerInMs / 1000 / 60 / 60 / 24);
      return `${timer} d.`;
    } else if (questTimerInMs < 86400000) {
      timer = Math.round(questTimerInMs / 1000 / 60 / 60);
      return `${timer} h.`;
    } else if (questTimerInMs < 1440) {
      timer = Math.round(questTimerInMs / 1000 / 60);
      return `${timer} m.`;
    } else if (questTimerInMs <= 0) {
      return "Failed"
    }
  }
}
