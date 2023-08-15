import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroment';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TweetsService {
  constructor(private httpClient: HttpClient) {}
  public gifsList: Gif[] = [];
  private URL = 'https://api.giphy.com/v1/gifs';

  public searchGif(query: string): Observable<SearchResponse> {
    const params = new HttpParams()
      .set('api_key', enviroment.gifsApi.apiKey)
      .set('limit', '12')
      .set('q', query);

    return this.httpClient.get<SearchResponse>(`${this.URL}/search`, {
      params,
    });
  }
}
