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
  symbol = ''; // Cambia este símbolo por el de la acción que desees
  stockQuote: any;
  StockPrice: number | undefined;
  total: number | undefined; 

  listEmpresas: Empresa[] = [
   
  ]
  

  constructor(private stockService: StockService, public empresaService: EmpresaService) {}


  ngOnInit(): void {
    // Muestra las empresas
    this.listEmpresas = this.empresaService.getListEmpresas();

    // Verifica si el símbolo está presente antes de obtener el precio
    if (this.symbol) {
      // Obtiene y asigna el precio a StockPrice
      this.stockService.getPrice(this.symbol).subscribe((data: any) => {
        this.StockPrice = data.price;
      });
    } 
    
  }


  eliminarAccion(empresa: Empresa){
    //this.empresaService.deleteEmpresa(empresa);
    this.empresaService.deleteEmpresa(empresa);
    // Actualiza la lista después de eliminar una empresa
    this.listEmpresas = this.empresaService.getListEmpresas();
  }

  
  

}