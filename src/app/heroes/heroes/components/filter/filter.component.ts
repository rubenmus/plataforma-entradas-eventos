import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {

  @Output() filterHeroEvent = new EventEmitter<string>();


  constructor(){}


  getHeroesByName(event: any){
    this.filterHeroEvent.emit(event.target.value);
  }
}
