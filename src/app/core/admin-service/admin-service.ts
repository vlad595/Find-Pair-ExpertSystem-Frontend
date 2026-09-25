import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { CreateRule, DeleteRule } from '../models/rule.model';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Rule } from '../models/rule.model';
import { CandidateCreation, CandidateResponse } from '../models/candidate.model';

@Service()
export class AdminService {
    private readonly apiUrl = 'http://localhost:5113'
    private readonly http = inject(HttpClient);

    rulesSubject = new BehaviorSubject<Rule[]>([]);
    $rules = this.rulesSubject.asObservable();

    candidatesSubject = new BehaviorSubject<CandidateResponse[]>([]);
    $candidates = this.candidatesSubject.asObservable();

    getRules(){
        return this.http.get<Rule[]>(this.apiUrl + '/api/Rules').pipe(
            tap(response => {
                this.rulesSubject.next(response);
                console.log('Rules are pulled successfully!', this.rulesSubject.value);
            })
        );
    }
    postRule(rule: CreateRule){
        return this.http.post<Rule>(this.apiUrl + '/api/Rules', rule).pipe(
            tap(response => {
                if (response){
                    this.rulesSubject.next([response, ...this.rulesSubject.value]);
                    console.log('Rule are created successfully!', this.rulesSubject.value);
                }
                else {
                    this.getRules().subscribe();
                }
            })
        );
    }
    deleteRule(ruleId: DeleteRule){
        return this.http.delete(this.apiUrl + '/api/Rules/' + ruleId.id).pipe(
            tap(respone => {
                this.rulesSubject.next([...this.rulesSubject.value.filter(r => r.id !== ruleId.id)]);
                console.log('Rule are deleted successfully!', this.rulesSubject.value);
            })
        );
    }
    postCandidate(candidate: CandidateCreation){
        console.log('Trying to send post candidate query with data: ', candidate);
        return this.http.post<CandidateResponse>(this.apiUrl + '/api/Candidates', candidate).pipe(
            tap(response => {
                this.candidatesSubject.next([response, ...this.candidatesSubject.value]);
                console.log('Candidate are created successfully!', this.candidatesSubject.value);
            }),
        );
    }
    getCandidates(){
        return this.http.get<CandidateResponse[]>(this.apiUrl + '/api/Candidates').pipe(
            tap(response => {
                this.candidatesSubject.next(response);
                console.log('Candidates are pulled successfully!', this.candidatesSubject.value);
            })   
        );
    }
}
