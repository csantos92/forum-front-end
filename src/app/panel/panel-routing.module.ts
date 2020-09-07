import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../services/user.guard';

//Components
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';

//Panel routes
const panelRoutes: Routes = [
    {
        path: 'panel',
        component: MainComponent,
        canActivate: [UserGuard],
        children: [
            { path: '', component: ListComponent },
            { path: 'list', component: ListComponent },
            { path: 'add', component: AddComponent },
            { path: 'edit/:id', component: EditComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(panelRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class PanelRoutingModule { } 
