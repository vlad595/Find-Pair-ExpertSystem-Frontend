import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Fact } from '../models/fact.model';
import { BehaviorSubject, tap } from 'rxjs';
import { FindMatchData, MatchData } from '../models/match.model';

@Service()
export class ClientService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = "http://localhost:5113"

    private factsSubject = new BehaviorSubject<Fact[]>([]);
    $facts = this.factsSubject.asObservable();

    getListOfFacts(){
        return this.http.get<Fact[]>(this.apiUrl + '/api/Facts').pipe(
            tap(response => {
                this.factsSubject.next(response);
            })
        );
    }
    findMatch(formData: FindMatchData){
        return this.http.post<MatchData>(this.apiUrl + '/api/Consultation/match', formData);
    }
}
