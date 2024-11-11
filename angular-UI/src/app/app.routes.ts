import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AlbumComponent } from './album/album.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'album/:id', component: AlbumComponent },
];
