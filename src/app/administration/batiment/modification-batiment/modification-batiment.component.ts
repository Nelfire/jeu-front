import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Batiment } from 'src/app/models/batiment';
import { BatimentService } from 'src/app/service/batiment.service';

@Component({
  selector: 'app-modification-batiment',
  templateUrl: './modification-batiment.component.html',
  styleUrls: ['./modification-batiment.component.scss']
})
export class ModificationBatimentComponent implements OnInit {

  // Initialisations
  messageValidation: string;
  messageErreur: string;
  id: number;
  batiment: Batiment;
  formModificationBatiment: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private routerLinkActive: ActivatedRoute,
    private batimentService: BatimentService) { }

  ngOnInit(): void {

    //Initialisation du formulaire vide
    this.formModificationBatiment = this.formBuilder.group({
      idTypeBatiment: ['', Validators.required],
      idCategorieBatiment: ['', Validators.required],
      icone: ['', Validators.required],
      libelle: ['', Validators.required],
      descriptif: ['', Validators.required],
      ouvrierNecessaireConstruction: ['', Validators.required],
      tempsDeConstruction: ['', Validators.required],
      coutPierreConstruction: ['', Validators.required],
      coutBoisConstruction: ['', Validators.required],
      coutOrConstruction: ['', Validators.required],
      coutNourritureConstruction: ['', Validators.required],
      niveauHotelDeVilleNecessaireConstruction: ['', Validators.required],
      quantiteeStockagePierre: ['', Validators.required],
      quantiteeStockageBois: ['', Validators.required],
      quantiteeStockageOre: ['', Validators.required],
      quantiteeStockageNourriture: ['', Validators.required],
      apportPierreHeure: ['', Validators.required],
      apportBoisHeure: ['', Validators.required],
      apportOreHeure: ['', Validators.required],
      apportNourritureHeure: ['', Validators.required]
    });
    // Snapshot pour rï¿½cupï¿½rer l'id passï¿½ via l'url
    this.id = this.routerLinkActive.snapshot.params['id'];

    this.batimentService.detailsBatiment(this.id).subscribe(
      (value) => {
        this.batiment = value;
        this.initialiserFormulaire();
      }
    );
  }

  initialiserFormulaire() {
    //Initialisation du formulaire avec données
    this.formModificationBatiment = this.formBuilder.group({
      idTypeBatiment: [this.batiment.idTypeBatiment, Validators.required],
      idCategorieBatiment: [this.batiment.idCategorieBatiment, Validators.required],
      icone: [this.batiment.icone, Validators.required],
      libelle: [this.batiment.libelle, Validators.required],
      descriptif: [this.batiment.descriptif, Validators.required],
      ouvrierNecessaireConstruction: [this.batiment.ouvrierNecessaireConstruction, Validators.required],
      tempsDeConstruction: [this.batiment.tempsDeConstruction, Validators.required],
      coutPierreConstruction: [this.batiment.coutPierreConstruction, Validators.required],
      coutBoisConstruction: [this.batiment.coutBoisConstruction, Validators.required],
      coutOrConstruction: [this.batiment.coutOrConstruction, Validators.required],
      coutNourritureConstruction: [this.batiment.coutNourritureConstruction, Validators.required],
      niveauHotelDeVilleNecessaireConstruction: [this.batiment.niveauHotelDeVilleNecessaireConstruction, Validators.required],
      quantiteeStockagePierre: [this.batiment.quantiteeStockagePierre, Validators.required],
      quantiteeStockageBois: [this.batiment.quantiteeStockageBois, Validators.required],
      quantiteeStockageOre: [this.batiment.quantiteeStockageOre, Validators.required],
      quantiteeStockageNourriture: [this.batiment.quantiteeStockageNourriture, Validators.required],
      apportPierreHeure: [this.batiment.apportPierreHeure, Validators.required],
      apportBoisHeure: [this.batiment.apportBoisHeure, Validators.required],
      apportOreHeure: [this.batiment.apportOreHeure, Validators.required],
      apportNourritureHeure: [this.batiment.apportNourritureHeure, Validators.required]
    });
  }

  modificationBatiment() {
    const idTypeBatiment = this.formModificationBatiment.get('idTypeBatiment').value;
    const idCategorieBatiment = this.formModificationBatiment.get('idCategorieBatiment').value;
    const icone = this.formModificationBatiment.get('icone').value;
    const libelle = this.formModificationBatiment.get('libelle').value;
    const descriptif = this.formModificationBatiment.get('descriptif').value;
    const ouvrierNecessaireConstruction = this.formModificationBatiment.get('ouvrierNecessaireConstruction').value;
    const tempsDeConstruction = this.formModificationBatiment.get('tempsDeConstruction').value;
    const coutPierreConstruction = this.formModificationBatiment.get('coutPierreConstruction').value;
    const coutBoisConstruction = this.formModificationBatiment.get('coutBoisConstruction').value;
    const coutOrConstruction = this.formModificationBatiment.get('coutOrConstruction').value;
    const coutNourritureConstruction = this.formModificationBatiment.get('coutNourritureConstruction').value;
    const niveauHotelDeVilleNecessaireConstruction = this.formModificationBatiment.get('niveauHotelDeVilleNecessaireConstruction').value;
    const quantiteeStockagePierre = this.formModificationBatiment.get('quantiteeStockagePierre').value;
    const quantiteeStockageBois = this.formModificationBatiment.get('quantiteeStockageBois').value;
    const quantiteeStockageOre = this.formModificationBatiment.get('quantiteeStockageOre').value;
    const quantiteeStockageNourriture = this.formModificationBatiment.get('quantiteeStockageNourriture').value;
    const apportPierreHeure = this.formModificationBatiment.get('apportPierreHeure').value;
    const apportBoisHeure = this.formModificationBatiment.get('apportBoisHeure').value;
    const apportOreHeure = this.formModificationBatiment.get('apportOreHeure').value;
    const apportNourritureHeure = this.formModificationBatiment.get('apportNourritureHeure').value;
    this.batimentService.administrationModificationBatiment(
      this.id,
      idTypeBatiment,
      idCategorieBatiment,
      icone,
      libelle,
      descriptif,
      ouvrierNecessaireConstruction,
      tempsDeConstruction,
      coutPierreConstruction,
      coutBoisConstruction,
      coutOrConstruction,
      coutNourritureConstruction,
      niveauHotelDeVilleNecessaireConstruction,
      quantiteeStockagePierre,
      quantiteeStockageBois,
      quantiteeStockageOre,
      quantiteeStockageNourriture,
      apportPierreHeure,
      apportBoisHeure,
      apportOreHeure,
      apportNourritureHeure,
      ).subscribe(
        () => {

        }, (error) => {
          this.messageErreur = error.error.message;
        }, () => {
          this.messageValidation = "Modification réalisée";
          setTimeout(() => {
            // Redirection au bout de 1,5 secondes
            this.router.navigate(['listeBatiment']);
          }, 1500);
        }
      );
  }

}
