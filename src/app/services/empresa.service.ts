// empresa.service.ts
import { Injectable } from '@angular/core';
import { Empresa } from '../interfaces/Empresa';



@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private listEmpresas: Empresa[] = [];

  getListEmpresas(): Empresa[] {
    return this.listEmpresas;
  }

  addEmpresa(empresa: Empresa) {
    this.listEmpresas.push(empresa);
  }

  deleteEmpresa(empresa: Empresa) {
    var index =  this.listEmpresas.indexOf(empresa);
    this.listEmpresas.splice(index,1);
    
  }

}
