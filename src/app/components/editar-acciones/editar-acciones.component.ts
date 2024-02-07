import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../interfaces/Empresa';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-editar-acciones',
  templateUrl: './editar-acciones.component.html'
})
export class EditarAccionesComponent {

  agregarAccion: FormGroup;
  StockPrice: number | undefined;
  //symbol = 'AAPL';
  
  constructor(private fb: FormBuilder, private empresaService: EmpresaService,private stockService: StockService) {
    this.agregarAccion = this.fb.group({
      nombre: ['', Validators.required],
      ticker: ['', Validators.required],
      numero: [0, Validators.required] // Inicializa a 0 o el valor predeterminado que desees
    });
  }

  /*ngOnInit():void{
     // Obtiene el precio
      this.stockService.getStockPrice(this.symbol).subscribe(data => {
      this.StockPrice = data; // Asigna el precio a StockPrice
    });
  }*/

  addAccion() {
    if (this.agregarAccion.valid) {
      const nuevaEmpresa: Empresa = {
        nombre: this.agregarAccion.get('nombre')?.value,
        ticker: this.agregarAccion.get('ticker')?.value, // Ticker debería ser proporcionado desde el formulario o lógica adicional
        precio: 0,
        acciones: this.agregarAccion.get('numero')?.value || 0,
        per: 0,
        invertido: 0,
        //yield: 0,
        //dividendos: 0
      };

      this.empresaService.addEmpresa(nuevaEmpresa);

      /*this.stockService.getStockPrice(this.symbol).subscribe(data => {
        this.StockPrice = data;
      });*/

    } else {
      console.error('Form is invalid. Cannot proceed.');
    }
  }
}
