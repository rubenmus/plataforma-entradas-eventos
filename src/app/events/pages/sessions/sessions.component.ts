import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import { EventsService } from '../../services/events.service';
import { EventSession } from '../../interfaces/eventsesion.interface';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-edit-sessions',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    HeaderComponent
  ],
  templateUrl:'./sessions.component.html',
  styleUrls: ['./sessions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionsComponent implements OnInit {
  constructor(
    private eventsService: EventsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ){}

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl<string>('', [Validators.required]),
    intelligence: new FormControl<number>(0),
    speed: new FormControl<number>(0),
    power: new FormControl<number>(0),
  });

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];

      this.eventsService.getEventsSesions()
      .pipe(
        catchError(error => {
          this.openSnackBar('Fallo en el servicio al intentar encontrar las sesiones')
          return of(undefined)}),
      )
      .subscribe((data: EventSession[] | undefined) => {
        if(!data){
          return
        }
        const eventFound = data.find(event => event.event.id === id);
        console.log(data);
        console.log(eventFound);
      });
    });
  }
  returnHome(){
    this.router.navigateByUrl('/events');
    }
  //TODO borrar
  updateHero(){}
  openSnackBar(m:string) {
    this._snackBar.open(m, '', {
      duration: 3000
    });
  }
}
