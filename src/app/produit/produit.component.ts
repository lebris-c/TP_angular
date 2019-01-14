import { Component, OnInit} from '@angular/core';
import { Produits } from '../mock-produits/mock-produits';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css'],
  template: `
  <style>
table, th , td  {
  border: 1px solid grey;
  border-collapse: collapse;
  padding: 5px;
}
table tr:nth-child(odd) {
  background-color: #f1f1f1;
}
table tr:nth-child(even) {
  background-color: #ffffff;
}
</style>
  <h2> Liste des produits
  <table>
  <tr>
    <th>Nom</th>
    <th>Fournisseur</th>
    <th>Email</th>
    <th>Description</th>
    <th>Age</th>
    <th>Condition de conservation</th>
    <th>Prix</th>
  </tr>
  <tr *ngFor="let produit of (produits | keyvalue)">
    <td>{{ produit.value.nom | uppercase}}</td>
    <td>{{ produit.value.fournisseur }}</td>
    <td>{{ produit.value.emailFournisseur }}</td>
    <td>{{ produit.value.description | lowercase | slice:0:20}}</td>
    <td>{{ produit.value.age }}</td>
    <td>{{ produit.value.conditionConservation }}</td>
    <td>{{ produit.value.prix | number }} €</td>
    <td> <button class="btn" (click)="remove(produit.key)">Supprimer</button></td>
  </tr>
</table>

<form (ngSubmit)="add()" [formGroup]="produitForm">
  <div>
  <label>Nom</label>
  <input type="text" formControlName="nom">
  </div>
  <div>
  <label>Fournisseur</label>
  <input type="text" formControlName="fournisseur">
  </div>
  <div>
  <label>age</label>
  <input type="text" formControlName="age">
  </div>
  <div>
  <label>description</label>
  <input type="text" formControlName="description">
  </div>
  <div>
  <button type="submit">Ajouter</button>
  </div>
</form>
  `
})
export class ProduitComponent implements OnInit {
  
  produits = Produits;

  nomCtrl: FormControl;
  fournisseurCtrl: FormControl;
  ageCtrl: FormControl;
  descriptionCtrl: FormControl;
  produitForm: FormGroup;
  constructor(fb: FormBuilder) {
    this.nomCtrl = fb.control('');
    this.fournisseurCtrl = fb.control('',Validators.required)
    this.ageCtrl = fb.control('')
    this.descriptionCtrl = fb.control('')
    this.produitForm = fb.group({
      nom: this.nomCtrl,
      fournisseur: this.fournisseurCtrl,
      age: this.ageCtrl,
      description: this.descriptionCtrl
    })
   }
  ngOnInit() {
  }
  
  remove(produit) {
    console.log(produit);
    this.produits.splice(produit, 1);
  }
  add() {
    let p = new Produit(this.produitForm.value.nom, this.produitForm.value.fournisseur, '', this.produitForm.value.description, 
    this.produitForm.value.age, '', 5);
    this.produits.push(p);
  }
  
}

export class Produit {
  nom: string;
  fournisseur: string;
  emailFournisseur: string;
  description: string;
  age: string;
  conditionConservation: string;
  prix: number;
  constructor(nom:string, fournisseur: string, emailFournisseur: string, description: string, age: string, conditionConservation: string, prix: number) {
    this.nom = nom;
    this.fournisseur = fournisseur;
    this.emailFournisseur = emailFournisseur;
    this.description = description;
    this.age = age;
    this.conditionConservation = conditionConservation;
    this.prix = prix;
  }
  
}
