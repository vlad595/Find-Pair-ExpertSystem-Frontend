import { Component } from '@angular/core';
import { Header } from '../../../layouts/header/header';
import { CandidatesSection } from '../candidates-section/candidates-section';
import { RulesSection } from '../rules-section/rules-section';

@Component({
  imports: [Header, CandidatesSection, RulesSection],
  selector: 'app-admin-page',
  styleUrl: './admin-page.css',
  templateUrl: './admin-page.html',
})
export class AdminPage {}
