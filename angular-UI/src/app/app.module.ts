import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './image/image.component';
import { AlbumSelectorComponent } from './album-selector/album-selector.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { GlobalContainerComponent } from './global-container/global-container.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ImageComponent,
    AlbumSelectorComponent,
    GlobalContainerComponent,
  ],
  imports: [CommonModule, NgxSpinnerModule, RouterModule],
  exports: [ImageComponent, AlbumSelectorComponent, GlobalContainerComponent],
})
export class AppModule {}
