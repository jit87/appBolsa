import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class StockService {

  //Claves
  private readonly alphaVantageApiKey = '22CEAEX0ALRYWVGC';
  private readonly polygonApiKey = 'RyUZfnDxPi7qX9OqVAoTFiwIKwzkr8U0'; 

  constructor(private http: HttpClient) {}

  getPrice(ticker: string): Observable<number> {
    if (!ticker) {
      console.warn('Error: El valor de "ticker" está vacío.');
      return of(0);
    }
    //Primero busca en Alpha Vantage, y si no hay datos en Polygon.io
    return this.http.get<any>(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&outputsize=full&apikey=${this.alphaVantageApiKey}`)
      .pipe(
        switchMap(alphaVantageResponse => {
          const alphaVantagePrice = alphaVantageResponse?.['Time Series (Daily)']?.['2024-02-17']?.['1. close'];
          if (alphaVantagePrice) {
            return of(alphaVantagePrice);
          } else {
            // Solo realiza la solicitud a Polygon.io si el valor de ticker está presente
            return this.http.get<any>(`https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${this.polygonApiKey}`)
            .pipe(
              switchMap(polygonResponse => {
                const polygonPrice = polygonResponse?.results?.[0]?.c;
                  if (polygonPrice !== undefined) {
                    console.log("Precio obtenido desde Polygon.io: ", polygonPrice);
                    return of(polygonPrice);
                  } else {
                    console.error("Error: No se pudo obtener el precio de la acción desde Polygon.io");
                    return of(0);
                  }
              }),
              catchError(polygonError => {
                console.error("Error al obtener el precio de la acción desde Polygon.io", polygonError);
                return of(0);
              })
            );
          }
        }),
        catchError((alphaVantageError: HttpErrorResponse) => {
          console.error("Error al obtener el precio de la acción desde Alpha Vantage", alphaVantageError);
          return of(0);
        })
      );
  }


  /*
  getPER(ticker: string): Observable<number> {
    if (!ticker) {
      console.warn('Error: El valor de "ticker" está vacío.');
      return of(0);
    }
  
    // Obtiene el PER desde Alpha Vantage
    return this.http.get<any>(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${ticker}&apikey=${this.alphaVantageApiKey}`)
      .pipe(
        switchMap(alphaVantageResponse => {
          const alphaVantagePER = alphaVantageResponse?.['PERatio'];
          if (alphaVantagePER !== undefined) {
            return of(alphaVantagePER);
          } else {
            // Obtiene el PER desde Polygon.io
            return this.http.get<any>(`https://api.polygon.io/v1/meta/symbols/${ticker}/company?apiKey=${this.polygonApiKey}`)
              .pipe(
                switchMap(polygonResponse => {
                  const polygonPER = polygonResponse?.results?.[0]?.peratio;
                  if (polygonPER !== undefined) {
                    console.log("PER obtenido desde Polygon.io: ", polygonPER);
                    return of(polygonPER);
                  } else {
                    console.error("Error: No se pudo obtener el PER de la acción desde Alpha Vantage ni Polygon.io");
                    return of(0);
                  }
                }),
                catchError(polygonError => {
                  console.error("Error al obtener el PER de la acción desde Polygon.io", polygonError);
                  return of(0);
                })
              );
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.error("Error al obtener el PER de la acción desde Alpha Vantage", error);
          return of(0);
        })
      );
  }*/
  

  getIndustry(ticker: string): Observable<string> {
    if (!ticker) {
        console.warn('Error: El valor de "ticker" está vacío.');
        return of('');
    }

    // Obteniene la información de la empresa desde Polygon.io
    return this.http.get<any>(`https://api.polygon.io/v1/meta/symbols/${ticker}/company?apiKey=${this.polygonApiKey}`)
      .pipe(
        switchMap(polygonResponse => {
          const industry = polygonResponse?.industry;
          if (industry !== undefined) {
            console.log("Industria obtenida desde Polygon.io: ", industry);
            return of(industry);
          } else {
            console.error("Error: No se pudo obtener la industria de la acción desde Polygon.io");
            return of('');
          }
        }),
        catchError(error => {
          console.error("Error al obtener la industria de la acción desde Polygon.io", error);
          return of('');
        })
      );
  }


  
}
