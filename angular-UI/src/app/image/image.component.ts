import {
  Component,
  computed,
  input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent implements OnInit {
  albumName = input.required<string>();
  imageName = input.required<string>();
  clickFullScreen = input<boolean>();

  isFullScreen: WritableSignal<boolean> = signal(false);

  public isLoading: WritableSignal<boolean> = signal(true);

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
  }

  fullSrc = computed(() => {
    return `https://thetoaster.ddns.net/albums/${this.albumName()}/${this.imageName()}`;
  });

  onLoad() {
    this.spinner.hide();
    this.isLoading.set(false);
  }

  click() {
    if (!this.clickFullScreen) {
      return;
    }

    this.isFullScreen.set(!this.isFullScreen());
  }
}
