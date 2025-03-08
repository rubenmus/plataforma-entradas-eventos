import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NewHeroComponent } from './new-hero.component';
import { HeroesService } from '../../service/heroes.service';

describe('NewHeroComponent', () => {
  let component: NewHeroComponent;
  let fixture: ComponentFixture<NewHeroComponent>;
  let mockHeroesService: jasmine.SpyObj<HeroesService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockRouter: Partial<Router>;

  beforeEach(async () => {
    mockHeroesService = jasmine.createSpyObj('HeroesService', ['addHero']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockRouter = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: HeroesService, useValue: mockHeroesService },
        { provide: ActivatedRoute, useValue: {} },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NewHeroComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to heroes list on returnHome', () => {
    component.returnHome();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/heroes');
  });

  it('should show snack bar if form is invalid', () => {
    spyOn(component, 'openSnackBar');

    component.newHero();

    expect(component.openSnackBar).toHaveBeenCalled();
    expect(mockHeroesService.addHero).not.toHaveBeenCalled();
    expect(mockSnackBar.open).not.toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).not.toHaveBeenCalled();
  });
});
