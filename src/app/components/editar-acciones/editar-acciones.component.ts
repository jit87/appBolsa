import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpresaService } from '../../services/empresa.service';
import { Empresa } from '../../interfaces/Empresa';
import { StockService } from '../../services/stock.service';
import { lastValueFrom } from 'rxjs';
import { ViewChild } from '@angular/core';
import { ContenidoComponent } from '../contenido/contenido.component';
import { FormControl } from '@angular/forms';
import { catchError, switchMap,debounceTime, distinctUntilChanged } from 'rxjs/operators';



@Component({
  selector: 'app-editar-acciones',
  templateUrl: './editar-acciones.component.html',
})
export class EditarAccionesComponent  implements OnInit {

  agregarAccion: FormGroup;
  StockPrice: number | undefined;
  per: number | undefined;
  industria: string | undefined;  
  @ViewChild('buscarTexto') buscarTexto: HTMLInputElement | undefined;


  constructor(private fb: FormBuilder, private empresaService: EmpresaService, private stockService: StockService) {
    this.agregarAccion = this.fb.group({
      nombre: ['', Validators.required],
      ticker: ['', Validators.required],
      numero: [0, Validators.required] 
    });
  }


  

  ngOnInit(): void {
    
   }

  

  //ACCIONES Y CALCULOS

  async addAccion() {
    if (this.agregarAccion.valid) {
      try {
        const ticker = this.agregarAccion.get('ticker')?.value;

        const precioObservable = this.stockService.getPrice(ticker);
        const precio = await lastValueFrom(precioObservable);
        const industriaObservable = this.stockService.getIndustry(ticker);
        this.industria = await lastValueFrom(industriaObservable);
     
         //const perObservable = this.stockService.getPER(ticker);
        //this.per = await lastValueFrom(perObservable);

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
      }
    } else {
      console.error('Formulario no válido. No se puede proceder.');  
    }

    // Evita que el formulario se envíe automáticamente
    return false;
  }



  updateInput(nombreEmpresa: string): void {
    const nombreActual = this.agregarAccion?.get('nombre')?.value;

    // Actualiza el valor solo si el campo está vacío
    if (!nombreActual) {
      this.agregarAccion?.get('nombre')?.setValue(nombreEmpresa);
    }

  }

  // Evento para notificar el cierre del formulario
  @Output() cerrarFormulario = new EventEmitter<void>();

  cerrar() {
    this.cerrarFormulario.emit();
  }


  //CONSULTAS

  searchEmpresa(nombre: string): void {
    this.stockService.getName(nombre).subscribe({
      next: resultado => {
        console.log(resultado);
        if (nombre === (this.buscarTexto?.value || '')) {
          this.updateInput(resultado);
        }
      },
      error: error => {
        console.error('Error al obtener el nombre de la empresa:', error);
      }
    });
  }

  







}
