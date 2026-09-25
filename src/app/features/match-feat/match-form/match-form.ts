import { Component, inject, Input } from '@angular/core';
import { FactComparison, MatchData } from '../../../core/models/match.model';
import { ClientService } from '../../../core/client-service/client-service';
import { required } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-match-form',
  styleUrl: './match-form.css',
  templateUrl: './match-form.html',
})
export class MatchForm {
  private readonly _router = inject(Router);
  public matchData!: MatchData;

  public comparisonList: FactComparison[] = [];
  public syncRate: number = 0;

  constructor(){
    const navigation = this._router.currentNavigation();
    if (navigation?.extras.state){
      this.matchData = navigation.extras.state['matchData'];
    }
  }

  ngOnInit(): void {
    if (this.matchData == null){
      this._router.navigate(['/client'])
    }
    this.buildComparisonMap();
    this.calculateSyncRate();
  }

  private buildComparisonMap(): void {
    const clientFacts = this.matchData!.inferredClientFacts;
    const candidateFacts = this.matchData!.bestMatch.facts;

    for (const [key, clientValue] of Object.entries(clientFacts)) {
      const matchValue = candidateFacts[key] || 'ВІДСУТНЬО';
      this.comparisonList.push({
        key,
        clientValue,
        matchValue,
        isMatch: clientValue === matchValue
      });
    }
  }

  private calculateSyncRate(): void {
    this.syncRate = Math.round((this.matchData!.compatibilityScore / 14) * 100);
  }
}
