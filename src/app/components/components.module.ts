import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarComponent } from './avatar/avatar.component';
import { MapaComponent } from './mapa/mapa.component';



@NgModule({
  declarations: [PostComponent, PostsComponent, AvatarComponent, MapaComponent],
  exports: [PostsComponent, AvatarComponent, MapaComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
