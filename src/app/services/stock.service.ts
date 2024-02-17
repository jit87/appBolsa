// Servicio actualizado solo con Alpha Vantage
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class StockService {
  
  constructor(private http: HttpClient) {}

  getPrice(ticker: string): Observable<number> {
    return this.http.get<any>(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=full&apikey=22CEAEX0ALRYWVGC`)
      .pipe(
        switchMap(alphaVantageResponse => {
          const alphaVantagePrice = alphaVantageResponse?.['Time Series (Daily)']?.['2024-02-17']?.['1. close'];
          if (alphaVantagePrice) {
            return of(alphaVantagePrice);
          } else {
            // Aquí se podría añadir otra API
            console.error("Error: No se pudo obtener el precio de la acción desde Alpha Vantage, superó el límite de peticiones diarias");
            return of(0);
          }
        }),
        catchError((alphaVantageError: HttpErrorResponse) => {
          console.error("Error al obtener el precio de la acción desde Alpha Vantage", alphaVantageError);
          return of(0);
        })
      );
  }
}
