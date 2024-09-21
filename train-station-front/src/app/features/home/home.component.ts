import { Component, OnInit } from '@angular/core';
import { TrainService } from '../../core/services/train.service';
import { Train } from '../../core/models/train.model';
import { TrainListComponent } from './components/train-list/train-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    TrainListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  trains: Array<Train> = [];
  date: string = '';
  destination: string = '';

  constructor(private trainService: TrainService) {}

  ngOnInit(): void {
    this.date = this.formatCurrentDate(new Date());
    this.getTrains();
  }

  getTrains() {
    if (this.date !== '' && this.destination !== '') {
      this.trainService.getTrainsWithTimeAndDestination(this.date, this.destination).subscribe((trains) => {
        this.trains = trains;
      });
    } else if (this.date !== '') {
      console.log('DATE')
      this.trainService.getTrainsWithTime(this.date).subscribe((trains) => {
        this.trains = trains;
      });
    } else if (this.destination !== '') {
      this.trainService.getTrainsWithDestination(this.destination).subscribe((trains) => {
        this.trains = trains;
      });
    }

    this.trains = this.trains.slice(0, 9);
  }

  onDateChange(value: string) {
    if (value === '') {
      this.trains = [];
    }
    this.date = value
    this.getTrains();
  }

  onDestinationChange(value: string) {
    if (value === '') {
      this.trains = [];
    }
    this.destination = value;
    this.getTrains();
  }
  
  removeTrain(value: string) {
    this.trainService.removeTrainById(value).subscribe({
      next: () => {
        this.trains = this.trains.filter(train => train.id !== value);
      },
      error: () => {
        alert("An error occured.")
      }
    })
  }

  formatCurrentDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
}
