import { Component, inject, OnInit, Input, signal, input } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [RouterLinkWithHref],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent  {
  @Input() name = ''
  @Input() price = 0 
  @Input() image = ''

  // constructor (private router: Router){}
  // goToDetail(pageName: string): void{
  //   this.router.navigate(['${/user}'])
  // }
}
