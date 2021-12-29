import { Component, OnInit} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { QuestlistService } from 'src/app/services/questlist.service';
import { Quest, questType } from 'src/app/shared/quest.model';

@Component({
  selector: 'app-questlist-edit',
  templateUrl: './questlist-edit.component.html',
  styleUrls: ['./questlist-edit.component.css'],
})
export class QuestlistEditComponent implements OnInit {
  id: number;
  editMode = false;
  questForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private QLservice: QuestlistService,
    private DataService: DataStorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  get controls() {
    return (<FormArray>this.questForm.get('questObjectives')).controls;
  }

  private initForm() {
    let questName = '';
    let questType = 'Daily';
    let questDescription = '';
    let questObjectives = new FormArray([]);

    if (this.editMode) {
      const quest = this.QLservice.getQuest(this.id);
      questName = quest.questName;
      questType = quest.questType;
      questDescription = quest.questDescription;

      if (quest['questObjectives']) {
        for (let objective of quest.questObjectives) {
          questObjectives.push(
            new FormGroup({
              name: new FormControl(objective.name, Validators.required),
              amount: new FormControl(
                objective.amount,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ),
            })
          );
        }
      }
    }

    this.questForm = new FormGroup({
      questName: new FormControl(questName, [
        Validators.required,
        Validators.minLength(2),
      ]),
      questType: new FormControl(questType),
      questDescription: new FormControl(questDescription, Validators.required),
      questObjectives: questObjectives,
    });
  }

  onAddObjective() {
    (<FormArray>this.questForm.get('questObjectives')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  onDeleteObjective(index: number) {
    (<FormArray>this.questForm.get('questObjectives')).removeAt(index);
  }

  onSubmit() {
    if (this.editMode) {
      this.QLservice.updateQuest(
        this.id,
        this.questForm.value,
      );
    } else {
      this.QLservice.addQuest(this.questForm.value);
    }
    setTimeout(() => {
      this.DataService.saveQuests(this.QLservice.getQuests());
    }, 1000);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onClose() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
