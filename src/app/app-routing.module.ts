import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages 
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { PanierComponent } from './features/panier/panier.component';
import { MesCommandesComponent } from './features/mes-commandes/mes-commandes.component';

// Guards
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { MenuListComponent } from './features/menu-list/menu-list.component';
import { MenuComponent } from './features/menu/menu.component';
import { AdminLayoutComponent } from './features/admin/admin-layout/admin-layout.component';
import { AdminProduitsListComponent } from './features/admin/admin-produits-list/admin-produits-list.component';
import { AdminProduitFormComponent } from './features/admin/admin-produit-form/admin-produit-form.component';

const routes: Routes = [

  // 🟢 Menu public
  { path: '', component: MenuListComponent },
    { path: 'produit/:id', component: MenuComponent },

  // 🟢 Auth public
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 🔐 Connecté uniquement
  { path: 'panier', component: PanierComponent, canActivate: [AuthGuard] },
  { path: 'commandes', component: MesCommandesComponent, canActivate: [AuthGuard] },

  // 🔒 Admin uniquement
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'produits', pathMatch: 'full' },
      { path: 'produits', component: AdminProduitsListComponent },
      { path: 'produits/create', component: AdminProduitFormComponent },
      { path: 'produits/edit/:id', component: AdminProduitFormComponent },
    ]
  },
  // ❌ 404
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
