import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../interfaces/Empresa';
import { StockService } from '../../services/stock.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-editar-acciones',
  templateUrl: './editar-acciones.component.html',
})
export class EditarAccionesComponent implements OnInit {

  agregarAccion: FormGroup;
  StockPrice: number | undefined;
  per: number | undefined;
  industria: string | undefined; 

  constructor(private fb: FormBuilder, private empresaService: EmpresaService, private stockService: StockService) {
    this.agregarAccion = this.fb.group({
      nombre: ['', Validators.required],
      ticker: ['', Validators.required],
      numero: [0, Validators.required] // Inicializa a 0 o el valor predeterminado que desees
    });
  }

  ngOnInit(): void {
    // Puedes inicializar valores adicionales si es necesario
  }

  async addAccion() {
    if (this.agregarAccion.valid) {
      try {
        const ticker = this.agregarAccion.get('ticker')?.value;

        const precioObservable = this.stockService.getPrice(ticker);
        const precio = await lastValueFrom(precioObservable);

        // Obtén el PER directamente, asegúrate de manejar errores según tus necesidades
        //const perObservable = this.stockService.getPER(ticker);
        //this.per = await lastValueFrom(perObservable);

        const industriaObservable = this.stockService.getIndustry(ticker);
        this.industria = await lastValueFrom(industriaObservable);

        const nuevaEmpresa: Empresa = {
          nombre: this.agregarAccion.get('nombre')?.value,
          ticker: ticker,
          precio: precio,
          acciones: this.agregarAccion.get('numero')?.value || 0,
          //per: this.per,
          invertido: (this.agregarAccion.get('numero')?.value || 0) * precio,
          industria: this.industria
        };

        this.empresaService.addEmpresa(nuevaEmpresa);

        // Reinicia el formulario después de agregar una acción con éxito
        this.agregarAccion.reset();

      } catch (error) {
        console.error('Error al obtener el precio de la acción', error);
        // Muestra un mensaje de error al usuario si es necesario
      }
    } else {
      console.error('Formulario no válido. No se puede proceder.');
      // Muestra un mensaje de error al usuario si es necesario
    }

    // Evitar que el formulario se envíe automáticamente
    return false;
  }
}
