import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeroesService } from '../../service/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { MaterialModule } from 'src/app/material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-new-hero',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewHeroComponent implements OnInit {

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

  returnHome(){
  this.router.navigateByUrl('/heroes')
  }

  ngOnInit(): void {

  }

  newHero(){
    if(!this.heroForm.valid){
      this.openSnackBar(`El héroe necesita un nombre`)
      return;
    }
    const updatedHero: Hero = {
      id: this.heroForm.value.id ?? '',
      name: this.heroForm.value.name ?? '',
      speed: this.heroForm.value.speed ?? 0,
      power: this.heroForm.value.power ?? 0,
      intelligence: this.heroForm.value.intelligence ?? 0
    };

    this.heroesService.addHero(updatedHero)
    .pipe(
      catchError(error => {
        this.openSnackBar('Fallo en el servicio al intentar crear un heroe')
        return of(undefined)}),
    )
    .subscribe(()=>{
      this.router.navigate([`heroes`]);
      this.openSnackBar(`El héroe ${this.heroForm.value.name} se ha creado`)

    })
  }
  openSnackBar(m:string) {
    this._snackBar.open(m, '', {
      duration: 3000
    });
  }
 }
