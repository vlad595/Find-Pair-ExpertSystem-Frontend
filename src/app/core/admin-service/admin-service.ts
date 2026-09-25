import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { CreateRule, DeleteRule } from '../models/rule.model';
import { BehaviorSubject, map, tap } from 'rxjs';
import { Rule } from '../models/rule.model';

@Service()
export class AdminService {
    private readonly apiUrl = 'http://localhost:5113'
    private readonly http = inject(HttpClient);

    rulesSubject = new BehaviorSubject<Rule[]>([]);
    $rules = this.rulesSubject.asObservable();

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
                this.rulesSubject.next([response, ...this.rulesSubject.value]);
                console.log('Rule are created successfully!', this.rulesSubject.value);
            })
        );
    }
    deleteRule(ruleId: DeleteRule){
        return this.http.delete(this.apiUrl + '/api/Rules' + ruleId.Id).pipe(
            tap(respone => {
                this.rulesSubject.next([...this.rulesSubject.value.filter(r => r.Id !== ruleId.Id)]);
                console.log('Rule are deleted successfully!', this.rulesSubject.value);
            })
        );
    }
}
