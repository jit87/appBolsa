// empresa.service.ts
import { Injectable } from '@angular/core';
import { Empresa } from '../interfaces/Empresa';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private listEmpresas: Empresa[] = [
    // ... tu lista actual de empresas
  ];

  getListEmpresas(): Empresa[] {
    return this.listEmpresas;
  }

  addEmpresa(empresa: Empresa) {
    this.listEmpresas.push(empresa);
  }
}
