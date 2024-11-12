import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '../services/albums.service';
import { ImageComponent } from '../image/image.component';
import { AlbumComponent } from '../album/album.component';
import { Router } from '@angular/router';
import { GlobalContainerComponent } from '../global-container/global-container.component';

@Component({
  selector: 'app-album-selector',
  templateUrl: './album-selector.component.html',
  styleUrl: './album-selector.component.scss',
})
export class AlbumSelectorComponent implements OnInit {
  constructor(public albumsService: AlbumsService) {}

  ngOnInit(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  selectAlbum(alb: string) {
    this.albumsService.selectAlbum(alb);
  }
}
