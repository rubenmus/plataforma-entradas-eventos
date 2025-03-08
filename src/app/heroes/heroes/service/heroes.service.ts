import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';

/*istanbul ignore file*/
@Injectable({
  providedIn: 'root'
})
export class HeroesService {

private baseUrl: string = 'http://localhost:3000/heroes';

  constructor(private http: HttpClient) { }


  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.baseUrl);
  }
  getHero(id: string): Observable<Hero|undefined>{
    return this.http.get<Hero>(`${this.baseUrl}/${id}`);
  }
  addHero(hero: Hero){
    return this.http.post(this.baseUrl,hero);
  }
  updateHero(hero: Hero){
    if(!hero.id) throw Error('Hero is required');

    return this.http.put(`${this.baseUrl}/${hero.id}`, hero);
  }
  deleteHero(id: string): Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/${id}`)
    .pipe(
      map(resp => true),
      );
  }
  getHeroByName(name: string): Observable<Hero[]> {
    const url = `${this.baseUrl}?name_like=${name}`;
    return this.http.get<Hero[]>(url);
  }
}
