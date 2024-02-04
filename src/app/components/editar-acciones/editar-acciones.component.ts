import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-editar-acciones',
  templateUrl: './editar-acciones.component.html'
})

export class EditarAccionesComponent {

  agregarAccion: FormGroup; 

  constructor(private fb: FormBuilder ){
     this.agregarAccion = this.fb.group({
      nombre: ['', Validators.required],
      numero: ['', Validators.required]
     }) 
  }

  /*

  ngOnInit(){

   
  }

  agregar(){
    
    const accion = {
      nombre: this.agregarAccion.get('nombre')?.value,
      acciones: this.agregarAccion.get('numero')?.value
    }

    console.log(accion);
  }



  

  mostrarEditorAccion() {
    $("#FormularioAccion").show();
  }
  
*/


}
