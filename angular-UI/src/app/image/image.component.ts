import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  HostListener,
  input,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent implements AfterViewInit {
  albumName = input.required<string>();
  imageName = input.required<string>();
  clickFullScreen = input<boolean>();

  isFullScreen: WritableSignal<boolean> = signal(false);

  public hasLoaded: WritableSignal<boolean> = signal(false);
  public hasLoadingStarted: WritableSignal<boolean> = signal(false);

  @ViewChild('imageContainer', { static: false })
  private image!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    this.onScroll();
  }

  constructor() {}

  fullSrc = computed(() => {
    return `https://thetoaster.ddns.net/albums/${this.albumName()}/${this.imageName()}`;
  });

  onLoad() {
    this.hasLoaded.set(true);
  }

  click() {
    if (!this.clickFullScreen) {
      return;
    }

    this.isFullScreen.set(!this.isFullScreen());
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.image) {
      const rect = this.image.nativeElement.getBoundingClientRect();
      const inViewport = rect.top <= window.scrollY + window.innerHeight; // math huh?
      if (inViewport && !this.hasLoadingStarted()) {
        console.log('shown ' + this.albumName());
        this.hasLoadingStarted.set(true);
      }
    }
  }
}
