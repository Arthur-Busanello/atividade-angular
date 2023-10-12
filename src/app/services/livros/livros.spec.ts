import { Livros } from './livros.service';

describe('Livro', () => {
  it('should create an instance', () => {
    expect(new Livros()).toBeTruthy();
  });
});