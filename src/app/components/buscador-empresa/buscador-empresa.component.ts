import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from '../../interfaces/Empresa';


@Component({
  selector: 'app-buscador-empresa',
  templateUrl: './buscador-empresa.component.html'
  
})
export class BuscadorEmpresaComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute ){ }

  ngOnInit() {

    this.activatedRoute.params.subscribe( params =>{
      console.log("Entra");
    });
      
  }

}
