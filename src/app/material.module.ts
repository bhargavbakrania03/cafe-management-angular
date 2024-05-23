import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    exports: [
        MatToolbarModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule,
    ]
})
export class MaterialModule { }