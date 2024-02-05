// Servicio actualizado para usar Alpha Vantage
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../interfaces/Empresa';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiKey = 'OEKQ0CCDYSYBETX2ng servr';
  private apiUrl = 'https://www.alphavantage.co';

  constructor(private http: HttpClient) {}

  getStockQuote(symbol: string): Observable<any> {
    const params = {
      function: 'TIME_SERIES_INTRADAY',
      symbol: symbol,
      interval: '1min',
      apikey: this.apiKey,
    };

    return this.http.get(this.apiUrl, { params });
  }


  getStockPrice(symbol: string): Observable<any> {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${this.apiKey}`;
    return this.http.get(url);
  }

  




}

