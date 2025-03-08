import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EditHeroComponent } from './edit-hero.component';
import { HeroesService } from '../../service/heroes.service';


describe('EditHeroComponent', () => {
  let component: EditHeroComponent;
  let fixture: ComponentFixture<EditHeroComponent>;
  let mockHeroesService: jasmine.SpyObj<HeroesService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockRouter: Partial<Router>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    mockHeroesService = jasmine.createSpyObj('HeroesService', ['getHero', 'updateHero']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockRouter = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };
    mockActivatedRoute = {
      params: of({ id: '1' })
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: HeroesService, useValue: mockHeroesService },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditHeroComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize heroForm with hero data', () => {
    const heroData = {
      id: '1',
      name: 'Batman',
      speed: 100,
      power: 70,
      intelligence: 80
    };
    mockHeroesService.getHero.and.returnValue(of(heroData));

    fixture.detectChanges();

    expect(mockHeroesService.getHero).toHaveBeenCalledWith('1');
    expect(component.heroForm.value).toEqual(heroData);
  });

  it('should navigate to heroes list on returnHome', () => {
    component.returnHome();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/heroes');
  });

  it('should show snack bar if form is invalid', () => {
    spyOn(component, 'openSnackBar');

    component.updateHero();

    expect(component.openSnackBar).toHaveBeenCalled();
    expect(mockHeroesService.updateHero).not.toHaveBeenCalled();
    expect(mockSnackBar.open).not.toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
  });
});
