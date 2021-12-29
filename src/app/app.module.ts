import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PlayerComponent } from './player/player.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestlistModule } from './questlist/questlist.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core.module';
import { CharacterCreationModule } from './character-creation/character-creation.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    PlayerComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    QuestlistModule,
    SharedModule,
    AuthModule,
    CharacterCreationModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
