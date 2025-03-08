import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { HeroesService } from '../../service/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';
import { Subject, catchError, debounceTime, distinctUntilChanged, filter, of, switchMap } from 'rxjs';
import { FilterComponent } from '../../components/filter/filter.component';
import {
  MatSnackBar
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FilterComponent,
    ModalComponent
    ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit{

  public heroes: Hero[] = [];
  public isLoading = true;
  searchHero$ = new Subject<string>();
  public message:string = '';



  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,

  ){
    this.searchHero$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((data:string)=>{
        return this.heroesService.getHeroByName(data);
      })
    )
    .subscribe((data)=>{
        this.heroes=data
        this.isLoading=false
    })
  }

  ngOnInit(): void {
    this.heroesService.getHeroes()
    .pipe(
      catchError(error => {
        this.openSnackBar('Fallo en el servicio en la carga de heroes')
        return of(undefined)}),
    )
    .subscribe(data=>{
      if(!data){
        return;
      }
      this.isLoading = false;
      this.heroes = data;
    })
  }

  deleteHero(id: string, name: string){
    if(!id){
      return;
    }
    const dialogRef = this.dialog.open( ModalComponent, {
      data: name
    });

    dialogRef.afterClosed()
      .pipe(
        filter( (result: boolean) => result ),
        switchMap( () => this.heroesService.deleteHero(id)),
        catchError(error => {
          this.openSnackBar('Fallo en el servicio al intentar borrar')
          return of(false)}),
        filter( (wasDeleted: boolean) => wasDeleted ),
      )
      .subscribe(() => {
        this.heroes = this.heroes.filter( (heroes:Hero) => heroes.id != id);
        this.openSnackBar('Héroe eliminado')
      });
  }
  editHero(id: string){
    this.router.navigate([`heroes/${id}/edit`]);
  }
  newHero(){
    this.router.navigate([`new`]);
  }
  filterHeroes(event: string){
    this.isLoading=true
    this.searchHero$.next(event);
  }
  openSnackBar(m:string) {
    this._snackBar.open(m, '', {
      duration: 3000
    });
  }
 }
