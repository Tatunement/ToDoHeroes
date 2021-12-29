import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { QuestlistService } from 'src/app/services/questlist.service';
import { Quest } from 'src/app/shared/quest.model';

@Component({
  selector: 'app-questdetail',
  templateUrl: './questdetail.component.html',
  styleUrls: ['./questdetail.component.css'],
})
export class QuestdetailComponent implements OnInit {
  quest: Quest;
  id: number;
  objForm: FormGroup;
  isFailed: boolean = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private QLService: QuestlistService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.quest = this.QLService.getQuest(this.id);
      this.initForm();
    });
  }

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
    let timer: number;
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
      this.isFailed = true
      return "Failed"
    }
  }

  get questExperience() {
    let experience = 0;
    switch (this.quest.questType) {
      case 'Daily':
        experience = 100;
        break;
      case 'Weekly':
        experience = 1400; //doing weekly stuff should be incentivated
        break;
    }
    for (let objectives of this.quest.questObjectives) {
      experience = experience + 10;
    }
    return experience;
  }

  onFailed() {

    this.QLService.deleteQuest(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    this.playerService.addExperience(this.questExperience)
    this.QLService.deleteQuest(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onClose() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  private initForm() {
    let objectives = new FormArray([]);

    for (let objective of this.quest.questObjectives) {
      objectives.push(
        new FormGroup({
          status: new FormControl('', [Validators.requiredTrue]),
        })
      );
    }

    this.objForm = new FormGroup({
      objectives: objectives,
    });
  }
}
