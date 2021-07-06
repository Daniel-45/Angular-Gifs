import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  get record() {
    return this.gifsService.record;
  }

  constructor(private gifsService: GifsService) { }

  ngOnInit(): void {
  }

  search(serachTerm: string) {
    this.gifsService.searchGifs(serachTerm);
  }

}
