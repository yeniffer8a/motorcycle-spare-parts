import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-reporting-error-to-user',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './reporting-error-to-user.component.html',
  styleUrl: './reporting-error-to-user.component.css',
})
export class ReportingErrorToUserComponent {}
