import { CommonModule, IMAGE_CONFIG } from '@angular/common';
import {
  Component,
  computed,
  input,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-image',
  standalone: true,
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        placeholderResolution: 40,
      },
    },
  ],
  imports: [CommonModule],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  albumName = input.required<string>();
  imageName = input.required<string>();
  clickFullScreen = input<boolean>();

  isFullScreen: WritableSignal<boolean> = signal(false);

  fullSrc = computed(() => {
    return `https://thetoaster.ddns.net/albums/${this.albumName()}/${this.imageName()}`;
  });

  click() {
    if (!this.clickFullScreen) {
      return;
    }

    this.isFullScreen.set(!this.isFullScreen());
  }
}
