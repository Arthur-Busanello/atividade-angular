import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Carros } from 'src/app/models/carros/carros';
import { CarroService } from 'src/app/services/carros/carros.services';

@Component({
  selector: 'app-carrosdetails',
  templateUrl: './carrosdetails.component.html',
  styleUrls: ['./carrosdetails.component.scss']
})
export class CarrosdetailsComponent {
  @Input() carros: Carros = new Carros();  
  @Output() retorno = new EventEmitter<Carros>(); 

  carroService = inject(CarroService);  


  constructor() {
}
salvar() {

  this.carroService.save(this.carros).subscribe({  
    next: carros => { 
      this.retorno.emit(carros);
    },
    error: erro => { 
      alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
      console.error(erro);
    }
  });
}
}