import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  upload() {

  }


}
