// En tu componente Angular

import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../interfaces/Empresa';


@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
})


export class ContenidoComponent implements OnInit {
  symbol = 'AAPL'; // Cambia este símbolo por el de la acción que desees
  stockQuote: any;
  StockPrice: number | undefined;
  total: number | undefined; 

  listEmpresas: Empresa[] = [
    { nombre: "Apple", ticker: "AAPL", precio: 150, acciones:10, per:30, invertido: 10000},
    { nombre: "Coca-Cola", ticker: "KO", precio: 58, acciones:38, per:25, invertido: 1500},
    { nombre: "Procter & Gamble", ticker: "PG", precio: 148, acciones:38, per:25, invertido: 2000}
  ]
  

  constructor(private stockService: StockService, private empresaService: EmpresaService) {
  }

  


  ngOnInit(): void {

    this.listEmpresas = this.empresaService.getListEmpresas();

    this.stockService.getStockQuote(this.symbol).subscribe(data => {
      // Accede a los datos de la cotización aquí
      this.stockQuote = data;

    });

    

    //Llama a la funcion calcularInvertido al inicio
    this.listEmpresas.forEach(empresa => {
      empresa.invertido = this.calcularInvertido(empresa);
    });



    //Llama a la funcion calcularDividendo al inicio
    /*this.listEmpresas.forEach(empresa => {
      empresa.dividendos = this.calcularDividendos(empresa);
    });*/

   // this.getStockPrice();
  }


  /*
  function getStockPrice(symbol:symbol):number { 
    var url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=your_api_key_here`;
  
    // Realizamos una solicitud HTTP para obtener los datos del precio de las acciones
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Extraemos el precio de cierre de la última entrada de datos
        const lastDataPoint = data['Time Series (5min)'][Object.keys(data['Time Series (5min)'])[0]];
        const stockPrice = parseFloat(lastDataPoint['4. close']);
  
        // Imprimimos el precio de las acciones
        console.log('Precio de la acción:', stockPrice);
        return stockPrice; 
      })
      .catch(error => {
        console.error('Error al obtener el precio de las acciones:', error);
      });


  }*/




  //Calcula el dinero invertido en una accion de una empresa
  calcularInvertido(empresa: Empresa): number {
    //var precio = this.stockService.getStockPrice(symbol);
    return empresa.acciones * empresa.precio;
  }



  //Calcula el total de dividendos en una accion de una empresa
 /* calcularDividendos(empresa: Empresa): number {
    return empresa.invertido * (empresa.yield/100);
  }*/

  //Vamos a calcular el total invertido de la cartera
  /*calcularTotalCartera(empresa:Empresa): number{
    this.total = this.total + empresa.invertido; 
    return this.total; 
  }*/


  eliminarAccion(){

  }





  

}