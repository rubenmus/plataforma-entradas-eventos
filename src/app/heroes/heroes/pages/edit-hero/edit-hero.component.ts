import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeroesService } from '../../service/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-edit-hero',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl:'./edit-hero.component.html',
  styleUrls: ['./edit-hero.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditHeroComponent implements OnInit {
  constructor(
    private heroesService: HeroesService,
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
      this.heroesService.getHero(params['id'])
      .pipe(
        catchError(error => {
          this.openSnackBar('Fallo en el servicio al intentar encontrar al heroe a editar')
          return of(undefined)}),
      )
      .subscribe((hero: Hero | undefined) => {
        if(!hero){
          return
        }
        this.heroForm.setValue({
          name: hero.name ?? '',
          intelligence: hero.intelligence ?? 0,
          speed: hero.speed ?? 0,
          power: hero.power ?? 0,
          id: hero.id
        });
      });
    });
  }
  returnHome(){
    this.router.navigateByUrl('/heroes')
    }
  updateHero(){
    if(!this.heroForm.valid){
      this.openSnackBar(`El heroe necesita un nombre`)
      return;
    }
    const updatedHero: Hero = {
      id: this.heroForm.value.id ?? '',
      name: this.heroForm.value.name ?? '',
      speed: this.heroForm.value.speed ?? 0,
      power: this.heroForm.value.power ?? 0,
      intelligence: this.heroForm.value.intelligence ?? 0
    };

    this.heroesService.updateHero(updatedHero)
    .pipe(
      catchError(error => {
        this.openSnackBar('Fallo en el servicio al intentar editar un heroe')
        return of(false)}),
    )
    .subscribe(()=>{
      this.router.navigate([`heroes`]);
      this.openSnackBar('Héroe editado')
    })
  }
  openSnackBar(m:string) {
    this._snackBar.open(m, '', {
      duration: 3000
    });
  }
}
