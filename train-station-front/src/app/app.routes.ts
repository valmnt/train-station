import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AddTrainComponent } from './features/add-train/add-train.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'add-train', component: AddTrainComponent },
];
