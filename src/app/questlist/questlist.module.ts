import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { QuestlistRoutingModule } from "../routes/questlist-routing.module";
import { QuestitemComponent } from "./questitem/questitem.component";
import { QuestlistEditComponent } from "./questlist-edit/questlist-edit.component";
import { QuestlistComponent } from "./questlist/questlist.component";
import { QuestdetailComponent } from './questdetail/questdetail.component';

@NgModule({
  declarations:[
    QuestitemComponent,
    QuestlistComponent,
    QuestlistEditComponent,
    QuestdetailComponent,
  ],
  imports:[
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    QuestlistRoutingModule,
  ]
})
export class QuestlistModule {}
