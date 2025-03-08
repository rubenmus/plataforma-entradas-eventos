import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroComponent } from './hero.component';
import { HeroesService } from '../../service/heroes.service';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let mockHeroesService: jasmine.SpyObj<HeroesService>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let mockRouter: Partial<Router>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockMatDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    mockHeroesService = jasmine.createSpyObj('HeroesService', ['getHeroes', 'getHeroByName', 'deleteHero']);
    mockRouter = {};
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockMatDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HeroesService, useValue: mockHeroesService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: MatDialog, useValue: mockMatDialog }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch heroes on initialization', () => {
    const mockHeroes = [{ id: "1",
    name: "Batman",
    speed: 100,
    power: 70,
    intelligence: 80}];
    mockHeroesService.getHeroes.and.returnValue(of(mockHeroes));

    fixture.detectChanges();

    expect(component.isLoading).toBe(false);
  });
});
