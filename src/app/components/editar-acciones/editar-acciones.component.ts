import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../interfaces/Empresa';
import { StockService } from '../../services/stock.service';
import { lastValueFrom } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editar-acciones',
  templateUrl: './editar-acciones.component.html'
})
export class EditarAccionesComponent {

  agregarAccion: FormGroup;
  StockPrice: number | undefined;
  
  constructor(private fb: FormBuilder, private empresaService: EmpresaService,private stockService: StockService) {
    this.agregarAccion = this.fb.group({
      nombre: ['', Validators.required],
      ticker: ['', Validators.required],
      numero: [0, Validators.required] // Inicializa a 0 o el valor predeterminado que desees
    });
  }


  async addAccion() {
    if (this.agregarAccion.valid) {
      const ticker = this.agregarAccion.get('ticker')?.value;
  
      try {
        console.log(ticker);
  
        const precioObservable: Observable<number> = this.stockService.getPrice(ticker);
        const precio = await lastValueFrom(precioObservable);
  
        console.log(precio);
  
        const nuevaEmpresa: Empresa = {
          nombre: this.agregarAccion.get('nombre')?.value,
          ticker: this.agregarAccion.get('ticker')?.value,
          precio: precio,
          acciones: this.agregarAccion.get('numero')?.value || 0,
          per: 0,
          invertido: 0,
        };
  
        console.log(nuevaEmpresa);
  
        this.empresaService.addEmpresa(nuevaEmpresa);
  
        // Evitar que el formulario se envíe automáticamente
        return false;
      } catch (error) {
        console.error('Error al obtener el precio de la acción', error);
      }
    } else {
      console.error('Formulario no válido. No se puede proceder.');
    }
  
    // Evitar que el formulario se envíe automáticamente
    return false;
  }
  
  
}
