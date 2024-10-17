import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DashboardComponent } from './components/components/dashboard/dashboard.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { MessagesComponent } from './components/shared/messages/messages.component';
import { LoaderComponent } from './components/shared/loader/loader.component';
//import { jsPDF } from 'jspdf';
//import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MessagesComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoaderComponent,
  ],
  //providers: [provideHttpClient(withFetch())],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

}
