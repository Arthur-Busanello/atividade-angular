import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Carros } from 'src/app/models/carros/carros';
import { CarroService } from 'src/app/services/carros/carros.services';

@Component({
  selector: 'app-carroslist',
  templateUrl: './carroslist.component.html',
  styleUrls: ['./carroslist.component.scss']
})
export class CarroslistComponent {

  lista: Carros[] = [];
  isValidMarca: boolean = true;
  isValidAno: boolean = true;

  carroSelecionadoParaEdicao: Carros = new Carros();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  carrosService = inject(CarroService);

  constructor() {
    this.listAll();
  }

  listAll() {
    this.carrosService.Service.listAll().subscribe({
      next: (lista: Carros[]) => {
        this.lista = lista;
      },
      error: (erro: any) => {
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });
  }

  adicionar(modal: any) {
    this.carroSelecionadoParaEdicao = new Carros();
    this.modalService.open(modal, { size: 'sm' });
  }

  editar(modal: any, carros: Carros, indice: number) {
    this.carroSelecionadoParaEdicao = Object.assign({}, carros);
    this.indiceSelecionadoParaEdicao = indice;
    this.modalService.open(modal, { size: 'sm' });
  }

  addOuEditarCarro(carros: Carros) {
    this.validateMarca(carros.marca);
    this.validateAno(carros.ano);

    if (!this.isValidMarca || !this.isValidAno) {
      alert('Por favor, insira dados válidos.');
      return;
    }

    if (carros.id) { 
      this.carrosService.edit(carros).subscribe({
          next: editedCarro => {
              this.lista[this.indiceSelecionadoParaEdicao] = editedCarro;
              alert('Carro editado com sucesso!');
          },
          error: erro => {
              alert('Ocorreu um erro ao tentar editar o carro.');
              console.error(erro);
          }
      });
    } else {
      this.carrosService.save(carros).subscribe({
          next: savedCarro => {
              this.lista.push(savedCarro);
              alert('Carro adicionado com sucesso!');
          },
          error: erro => {
              alert('Ocorreu um erro ao tentar adicionar o carro.');
              console.error(erro);
          }
      });
    }

    this.modalService.dismissAll();
  }

  delete(id: number, index: number) {
    if (confirm('Você tem certeza de que deseja deletar este carro?')) {
      this.carrosService.delete(id).subscribe({
        next: () => {
          this.lista.splice(index, 1);
          alert('Carro deletado com sucesso!');
        },
        error: erro => {
          alert('Ocorreu um erro ao tentar deletar o carro.');
          console.error(erro);
        }
      });
    }
  }

  validateMarca(marca: string): void {
    this.isValidMarca = !!marca; 
  }
  
  validateAno(ano: number): void {
    this.isValidAno = ano > 0; 
  }

}