import { ElementRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  constructor(private gifsService: GifsService) { }

  @ViewChild('searchTerm') searchTerm!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
  }

  search() {
    const value = this.searchTerm.nativeElement.value;
    // Avoid empty searches
    if (value.trim().length === 0) {
      return;
    }
    this.gifsService.searchGifs(value);
    this.searchTerm.nativeElement.value = '';
  }

}
