import { Component, inject } from '@angular/core';
import { AdminService } from '../../../core/admin-service/admin-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../../core/client-service/client-service';
import { AsyncPipe } from '@angular/common';
import { Fact } from '../../../core/models/fact.model';
import { CandidateCreation } from '../../../core/models/candidate.model';

@Component({
  imports: [ReactiveFormsModule, AsyncPipe],
  selector: 'app-candidates-section',
  styleUrl: './candidates-section.css',
  templateUrl: './candidates-section.html',
})
export class CandidatesSection {
  private readonly _service = inject(AdminService);
  private readonly _clientService = inject(ClientService);

  $factsList = this._clientService.$facts;
  facts: Fact[] = [];

  selectedFacts: Record<string, string> = {};

  $candidates = this._service.$candidates;

  candidateCreationForm: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    gender: new FormControl('', Validators.required),
    age: new FormControl('', [Validators.required, Validators.minLength(18), Validators.maxLength(120)]),
  });

  ngOnInit(){
    this.$factsList = this._clientService.$facts;
    this._clientService.getListOfFacts().subscribe();
    this._service.getCandidates().subscribe();
    this.$factsList.subscribe({
      next: (response) => {
        this.facts = response;
        this.facts.forEach(fact => {
        this.candidateCreationForm.addControl(fact.fact, new FormControl(''));
        })
      }
    })
  }

  selectedOption(fact: string, value: string){
    console.log(`selected option ${fact}: `, value)
    if (value === ''){
      delete this.selectedFacts[fact];
    }
    else {
      this.selectedFacts[fact] = value;
    }
  }

  onSubmit(){
    if(this.candidateCreationForm.valid){
      const candidateCreationFormData: CandidateCreation = {
        fullName: this.candidateCreationForm.value('fullName'),
        gender: this.candidateCreationForm.value('gender'),
        age: this.candidateCreationForm.value('age'),
        facts: this.selectedFacts
      };
    }
  }
}
