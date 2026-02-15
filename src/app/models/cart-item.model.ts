import { ProduitResponseDTO } from "./produit.model";

export interface CartItem {
  produit: ProduitResponseDTO;
  quantity: number;
}
