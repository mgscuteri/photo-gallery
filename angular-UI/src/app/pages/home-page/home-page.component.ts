import { Component } from '@angular/core';
import { ImageComponent } from '../../image/image.component';
import { AlbumSelectorComponent } from '../../album-selector/album-selector.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [AlbumSelectorComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
