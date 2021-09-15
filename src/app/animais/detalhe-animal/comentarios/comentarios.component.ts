import { ComentariosService } from './comentarios.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Comentarios } from './comentarios';
import { startWith, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  @Input() id!: number;
  comentarios$!: Observable<Comentarios>;
  comentarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private comentarioService: ComentariosService,
  ) { }

  ngOnInit(): void {
    this.comentarios$ = this.comentarioService.buscaComentario(this.id);
    this.comentarioForm = this.formBuilder.group({
      comentario: ['', [Validators.maxLength(300)]],
    });
  }

  gravar(): void {
    const comentario = this.comentarioForm.get('comentario')?.value ?? '';
    this.comentarios$ = this.comentarioService.incluiComentario(this.id, comentario)
      .pipe(
        switchMap(() => this.comentarioService.buscaComentario(this.id)),
        tap(() => {
          this.comentarioForm.reset();
          alert("O comentário foi salvo!");
        })
      );
  }

}
