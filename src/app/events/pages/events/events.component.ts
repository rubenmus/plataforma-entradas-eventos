import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Events } from '../../interfaces/events.interface';

import { Subject, catchError, debounceTime, distinctUntilChanged, filter, of, switchMap } from 'rxjs';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
import { HeaderComponent } from '../../components/header/header.component';
import { EventsService } from '../../services/events.service';


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ModalComponent,
    HeaderComponent,
    RouterModule
    ],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit{

  screenWidth: number = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  public isLoading = true;
  public message:string = '';
  public events: Events[] =[];

  constructor(
    private evetsService: EventsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,

  ){}

  ngOnInit(): void {
    this.evetsService.getEvents()
    .pipe(
      catchError(error => {
        this.openSnackBar('Fallo en el servicio en la carga de los eventos')
        return of(undefined)}),
    )
    .subscribe(data=>{
      if(!data){
        return;
      }
      this.events = data.sort((a, b) => parseInt(a.endDate) - parseInt(b.endDate));
    });

    //TODO borrar
    this.evetsService.getEventsSesions()
    .pipe(
      catchError(error => {
        this.openSnackBar('Fallo en el servicio en la carga de los eventos')
        return of(undefined)}),
    )
    .subscribe(data=>{
      if(!data){
        return;
      }
      console.log(data);
    });
  }

  goSessions(id: string){
    this.router.navigate([`sessions/${id}`]);
  }


  openSnackBar(m:string) {
    this._snackBar.open(m, '', {
      duration: 3000
    });
  }
 }
