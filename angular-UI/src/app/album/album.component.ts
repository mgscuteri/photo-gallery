import { Component, computed, input, OnInit } from '@angular/core';
import { ImageComponent } from '../image/image.component';
import { AlbumsService, PhotoMetadata } from '../services/albums.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [ImageComponent, CommonModule],
  providers: [AlbumsService],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
})
export class AlbumComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public albumsService: AlbumsService
  ) {}

  ngOnInit() {}
}
