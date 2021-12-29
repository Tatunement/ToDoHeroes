import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlayerService } from 'src/app/services/player.service';
import { QuestlistService } from 'src/app/services/questlist.service';
import { PlayerCharacter } from 'src/app/shared/player.model';
import { Quest } from 'src/app/shared/quest.model';

@Component({
  selector: 'app-questlist',
  templateUrl: './questlist.component.html',
  styleUrls: ['./questlist.component.css'],
})
export class QuestlistComponent implements OnInit, OnDestroy {
  playerInfo: PlayerCharacter;
  questList: Quest[];
  private subscriptions = new Subscription();
  isEditing: boolean = false;
  maxHp: number;

  constructor(
    private QLservice: QuestlistService,
    private PService: PlayerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.QLservice.questListChanges.subscribe((quests: Quest[]) => {
        this.questList = quests;
      })
    );
    this.subscriptions.add(
      this.PService.playerChanges.subscribe((player: PlayerCharacter) => {
        this.playerInfo = player;
        this.maxHp = this.PService.maxHp;
      })
    );
    this.questList = this.QLservice.getQuests();
    this.playerInfo = this.PService.player;
  }

  onAddQuest() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onSelectQuest(quest: Quest) {
    this.QLservice.questSelected.next(quest);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
