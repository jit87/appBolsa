import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../interfaces/Empresa';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-industry-chart',
  templateUrl: './industry-chart.component.html'
})
export class IndustryChartComponent implements OnInit {

  chartData: any[] = [['Industria', 'Valor']];
  width = 400;
  height = 300;

  constructor(private empresaService: EmpresaService) {}

  ngOnInit(): void {
    const empresas = this.empresaService.getListEmpresas();
    
    empresas.forEach((empresa: Empresa) => {
      this.chartData.push([empresa.industria, empresa.invertido]);
    });
  }
}
