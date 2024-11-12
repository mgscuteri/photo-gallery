import { Component } from '@angular/core';
import { ImageComponent } from '../../image/image.component';
import { AlbumSelectorComponent } from '../../album-selector/album-selector.component';
import { AppModule } from '../../app.module';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  standalone: true,
  imports: [AppModule],
})
export class HomePageComponent {}
