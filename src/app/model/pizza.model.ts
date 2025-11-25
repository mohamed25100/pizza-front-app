export class Pizza {
    id : number;
    nom : string;
    megaPrix : number;
    normalPrix : number;

    constructor(id : number, nom : string, megaPrix : number, normalPrix : number) {
        this.id = id;
        this.nom = nom;
        this.megaPrix = megaPrix;
        this.normalPrix = normalPrix;
    }
}