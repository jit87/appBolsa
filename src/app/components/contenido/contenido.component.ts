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
   
  ]
  

  constructor(private stockService: StockService, public empresaService: EmpresaService) {}



  ngOnInit(): void {
    // Muestra las empresas
    this.listEmpresas = this.empresaService.getListEmpresas();
  
    // Obtiene y asigna el precio a StockPrice
    this.stockService.getPrice(this.symbol).subscribe((data: any) => {
      this.StockPrice = data.price;
    });
  }


  //Calcula el dinero invertido en una accion de una empresa
  calcularInvertido(empresa: Empresa): number {
    var precio = this.stockService.getPrice(this.symbol);
    const precioNumerico = parseInt(precio.toString(), 10);
    return empresa.acciones * precioNumerico;
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


  eliminarAccion(empresa: Empresa){
    //this.empresaService.deleteEmpresa(empresa);
    this.empresaService.deleteEmpresa(empresa);
    // Actualiza la lista después de eliminar una empresa
    this.listEmpresas = this.empresaService.getListEmpresas();
  }





  

}