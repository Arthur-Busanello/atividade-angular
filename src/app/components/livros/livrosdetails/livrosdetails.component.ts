import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Livros } from 'src/app/models/livros/livros'; 
import { LivroService } from 'src/app/services/livros/livros.service'; 

@Component({
  selector: 'app-livrosdetails',
  templateUrl: './livrosdetails.component.html',
  styleUrls: ['./livrosdetails.component.scss']
})
export class LivrosdetailsComponent {

  @Input() livro: Livros = new Livros();
  @Output() retorno = new EventEmitter<Livros>();

  livroService = inject(LivroService);

  constructor() { }

  salvar() {
    this.livroService.save(this.livro).subscribe({
      next: livro => { 
        this.retorno.emit(livro);
      },
      error: erro => { 
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });
  }
}