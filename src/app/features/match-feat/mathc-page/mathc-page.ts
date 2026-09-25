import { Component } from '@angular/core';
import { Header } from '../../../layouts/header/header';
import { MatchForm } from '../match-form/match-form';
import { Footer } from '../../../layouts/footer/footer';

@Component({
  imports: [Header, MatchForm, Footer],
  selector: 'app-mathc-page',
  styleUrl: './mathc-page.css',
  templateUrl: './mathc-page.html',
})
export class MathcPage {}
