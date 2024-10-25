import { Component, inject, OnInit, Input, signal, input } from '@angular/core';
import { Router, RouterLinkWithHref, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLink],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent  {
  @Input() name = ''
  @Input() price = 0 
  @Input() image = ''
  @Input() id = ''

  constructor (private router: Router){}
  // goToDetail(pageName: string): void{
  //   this.router.navigate(['${/productDetail/}'+ this.id])
  // }
}
