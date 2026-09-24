import { Component, inject } from '@angular/core';
import { ClientService } from '../../../core/client-service/client-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Fact } from '../../../core/models/fact.model';
import { AsyncPipe } from '@angular/common';
import {
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  imports: [ReactiveFormsModule, AsyncPipe, CdkDrag, CdkDropList, CdkDropListGroup],
  selector: 'app-candidate-form',
  styleUrl: './candidate-form.css',
  templateUrl: './candidate-form.html',
})
export class CandidateForm {
  private readonly _service = inject(ClientService);

  clientForm: FormGroup = new FormGroup({});

  $asyncFacts = this._service.$facts;
  facts: Fact[] = [];
  selectedValues: Record<string, string[]> = {};

  ngOnInit(){
    this._service.getListOfFacts().subscribe({
      next: (response) => {
        console.log('Successfully pulled facts'); 
      },
      error: (error) => {
        console.error('FATAL', error);
      }
    })
    this._service.$facts.subscribe({
      next: (response) => {
        this.facts = response;
        this.facts.forEach(item => {
          if (!this.clientForm.contains(item.fact)) {
            this.clientForm.addControl(item.fact, new FormControl(''));
          }
          this.selectedValues[item.fact] ??= [];
        });
      },
      error: (error) => {
        console.error('FATAL ERROR', error);
      }
    })
  }

  getSelectedValues(factName: string): string[] {
    return this.selectedValues[factName] ?? [];
  }

  canEnterSelectedChip(drag: CdkDrag, dropList: CdkDropList<string[]>): boolean {
    return dropList.data.length === 0 || drag.dropContainer === dropList;
  }

  onValueDropped(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    const factName = event.container.id.startsWith('selected-')
      ? event.container.id.slice('selected-'.length)
      : event.previousContainer.id.slice('selected-'.length);

    this.clientForm.get(factName)?.setValue(this.getSelectedValues(factName)[0] ?? '');
  }
}
