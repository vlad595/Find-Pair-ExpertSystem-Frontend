import { Component, inject } from '@angular/core';
import { AdminService } from '../../../core/admin-service/admin-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { CreateRule, DeleteRule } from '../../../core/models/rule.model';

@Component({
  imports: [ReactiveFormsModule, AsyncPipe],
  selector: 'app-rules-section',
  styleUrl: './rules-section.css',
  templateUrl: './rules-section.html',
})
export class RulesSection {
  private readonly _service = inject(AdminService)

  $rules = this._service.$rules;

  ruleCreationForm: FormGroup = new FormGroup({
    Description: new FormControl(''),
    ConditionFact: new FormControl(''),
    ConditionValue: new FormControl(''),
    ResultFact: new FormControl(''),
    ResultValue: new FormControl('')
  });

  ngOnInit(){
    this._service.getRules().subscribe();
  }

  onDelete(ruleId: string){
    const ruleDeletion: DeleteRule = {
      id: ruleId
    };
    this._service.deleteRule(ruleDeletion).subscribe();
  }

  onSubmit(){
    const formData = this.ruleCreationForm.value;
    const ruleCreation: CreateRule = {
      description: formData['Description'],
      conditionFact: formData['ConditionFact'],
      conditionValue: formData['ConditionValue'],
      resultFact: formData['ResultFact'],
      resultValue: formData['ResultValue']
    };
    this._service.postRule(ruleCreation).subscribe();
  }
}
