import { Component, computed, input } from '@angular/core';
import { ImageComponent } from '../image/image.component';
import { AlbumsService, PhotoMetadata } from '../services/albums.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [ImageComponent, CommonModule],
  providers: [AlbumsService],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
})
export class AlbumComponent {
  constructor(public albumsService: AlbumsService) {}
  photos = input.required<PhotoMetadata[] | undefined>();
  albumName = input.required<string>();
}
