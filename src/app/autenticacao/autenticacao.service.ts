import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(private httpClient: HttpClient) { }

  autenticar(usuario: string, senha: string) {
    return this.httpClient.post('http://localhost:3000/user/login', {
      userName: usuario,
      password: senha
    });
  }
}
