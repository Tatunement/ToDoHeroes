import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/guards/auth.guard";
import { CharGuard } from "../guards/char.guard";
import { QuestdetailComponent } from "../questlist/questdetail/questdetail.component";
import { QuestlistEditComponent } from "../questlist/questlist-edit/questlist-edit.component";
import { QuestlistComponent } from "../questlist/questlist/questlist.component";

const routes: Routes = [
  {
    path: '',
    component: QuestlistComponent,
    canActivate: [AuthGuard, CharGuard],
    children: [
      {
        path: 'new',
        component: QuestlistEditComponent
      },
      {
        path: ':id',
        component: QuestdetailComponent
      },
      {
        path: ':id/edit',
        component: QuestlistEditComponent
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestlistRoutingModule {}
