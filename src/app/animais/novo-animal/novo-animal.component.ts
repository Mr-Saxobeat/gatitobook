import { AnimaisService } from './../animais.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-novo-animal',
  templateUrl: './novo-animal.component.html',
  styleUrls: ['./novo-animal.component.css']
})
export class NovoAnimalComponent implements OnInit {

  formularioAnimal!: FormGroup;
  file!: File;
  preview!: string;
  percentualConcluido!: number;

  constructor(
    private formBuilder: FormBuilder,
    private animaisService: AnimaisService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formularioAnimal = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true],
    })
  }

  upload() {
    const allowComments = this.formularioAnimal.get('allowComments')?.value ?? false;
    const description = this.formularioAnimal.get('description')?.value ?? '';

    this.animaisService.upload(description, allowComments, this.file).pipe(
      finalize(() => this.router.navigate(['']))
    );
  }

  gravaArquivo(arquivo: any): void {
    const [file] = arquivo?.files;
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event:any) => (this.preview = event.target.result);
    reader.readAsDataURL(file);
  }


}