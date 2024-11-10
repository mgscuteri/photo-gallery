import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  albumName = input.required<string>();
  imageName = input.required<string>();

  fullSrc = computed(() => {
    return `https://thetoaster.ddns.net/albums/${this.albumName()}/${this.imageName()}`;
  });
}
