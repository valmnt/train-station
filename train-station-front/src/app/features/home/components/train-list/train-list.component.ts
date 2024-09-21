import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Train } from '../../../../core/models/train.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-train-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.css']
})
export class TrainListComponent {
  @Input() trains: Array<Train> = [];
  @Output() removeTrainEmitter = new EventEmitter<string>();

  constructor() { }

  removeTrain(value: string) {
    this.removeTrainEmitter.emit(value);
  }
}
