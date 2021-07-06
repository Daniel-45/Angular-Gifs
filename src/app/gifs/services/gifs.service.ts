import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey = environment.API_KEY;
  private baseURL = environment.URL;

  private _record: string[] = [];

  public results: Gif[] = [];

  get record() {
    return [...this._record];
  }

  constructor(private http: HttpClient) {
    this._record = JSON.parse(localStorage.getItem('record')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGifs(query: string) {
    query = query.trim().toLowerCase();
    // Avoid showing duplicates
    if (!this._record.includes(query)) {
      this._record.unshift(query);
      // Limit to ten results in record
      this._record = this._record.splice(0, 10);

      localStorage.setItem('record', JSON.stringify(this._record));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '9')
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.baseURL}/search`, { params })
      .subscribe((res) => {
        this.results = res.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }
}
