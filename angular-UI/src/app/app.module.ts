import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './image/image.component';
import { AlbumSelectorComponent } from './album-selector/album-selector.component';
import { GlobalContainerComponent } from './global-container/global-container.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    ImageComponent,
    AlbumSelectorComponent,
    GlobalContainerComponent,
    LoaderComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [ImageComponent, AlbumSelectorComponent, GlobalContainerComponent],
})
export class AppModule {}
