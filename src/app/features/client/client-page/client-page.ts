import { Component } from '@angular/core';
import { CandidateForm } from '../candidate-form/candidate-form';
import { Header } from '../../../layouts/header/header';
import { Footer } from '../../../layouts/footer/footer';

@Component({
  imports: [CandidateForm, Header, Footer],
  selector: 'app-client-page',
  styleUrl: './client-page.css',
  templateUrl: './client-page.html',
})
export class ClientPage {}
