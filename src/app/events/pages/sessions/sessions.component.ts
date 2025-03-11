import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';
import { EventsService } from '../../services/events.service';
import { EventSession, Session } from '../../interfaces/eventsesion.interface';
import { HeaderComponent } from '../../components/header/header.component';
import { ChangeDetectorRef } from '@angular/core';

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

  public events: EventSession | undefined;
  selectedSessions: Record<string, any> = {};
  selectedSessionsArray: any[] = [];

  constructor(
    private eventsService: EventsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ){}

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
        this.events = eventFound;
        this.cdr.markForCheck();
      });
    });
  }

  increment(session: Session){
    if(!this.selectedSessions[session.date]){
      this.selectedSessions[session.date] = { ...session, count: 0};
    }
    if(this.selectedSessions[session.date].count < session.availability){
      this.selectedSessions[session.date].count++;
    }
    this.updateSelectedSessionsArray();
  }
  decrement(session: Session){
    if(!this.selectedSessions[session.date]){
      return;
    }
    if(this.selectedSessions[session.date].count > 0){
      this.selectedSessions[session.date].count--;
    }
    if(this.selectedSessions[session.date].count === 0){
      delete this.selectedSessions[session.date];
    }
    this.updateSelectedSessionsArray();
  }

  updateSelectedSessionsArray() {
    this.selectedSessionsArray = Object.values(this.selectedSessions);
  }
  removeSession(session: Session){
    if(!session){
      return;
    }
    delete this.selectedSessions[session.date];
    this.selectedSessionsArray = this.selectedSessionsArray.filter(s => s.date !== session.date)
  }
  returnHome(){
    this.router.navigateByUrl('/events');
    }
  openSnackBar(m:string) {
    this._snackBar.open(m, '', {
      duration: 3000
    });
  }
}
