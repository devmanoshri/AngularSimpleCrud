import { Component, OnInit } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent implements OnInit {
  showLoader!: boolean;
  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.loaderService.showLoader$.subscribe(
      (value) => (this.showLoader = value)
    );
  }
}
