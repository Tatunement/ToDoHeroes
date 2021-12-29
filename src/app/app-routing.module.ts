import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { CharacterCreationModule } from './character-creation/character-creation.module';
import { QuestlistModule } from './questlist/questlist.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/questlist',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => AuthModule,
  },
  {
    path: 'questlist',
    loadChildren: () => QuestlistModule,
  },
  {
    path: 'charactercreation',
    loadChildren: () => CharacterCreationModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
