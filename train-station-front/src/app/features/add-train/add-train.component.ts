import { Component } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { TrainService } from '../../core/services/train.service';

@Component({
  selector: 'app-add-train',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-train.component.html',
  styleUrls: ['./add-train.component.css']
})
export class AddTrainComponent {
  departure = '';
  arrival = '';
  destination = '';
  
  constructor(private trainService: TrainService) {}

   onSubmit() {
    this.trainService.postTrain({
      destination: this.destination, 
      departureTime: `${this.departure}:00Z`, 
      arrivalTime: `${this.arrival}:00Z`
    }).subscribe({
      next: () => {
        location.reload();
      },
      error: () => {
        alert('An error occured');
      }
    })
  }
}
