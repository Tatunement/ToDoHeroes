import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { CharacterCreationComponent } from './character-creation.component';

@NgModule({
  declarations: [CharacterCreationComponent],
  imports: [

    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: CharacterCreationComponent,
        canActivate: [AuthGuard]
      },
    ]),
    FormsModule,
    ReactiveFormsModule
  ],
})
export class CharacterCreationModule {}
