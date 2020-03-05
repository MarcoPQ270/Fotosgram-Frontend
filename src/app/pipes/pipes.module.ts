import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizerPipe } from './dom-sanitizer.pipe';
import { ImagenPipe } from './imagen.pipe';
import { DomSsanitizerPipe } from './dom-ssanitizer.pipe';



@NgModule({
  declarations: [DomSanitizerPipe, ImagenPipe, DomSsanitizerPipe],
 exports: [DomSanitizerPipe, ImagenPipe, DomSsanitizerPipe]
})
export class PipesModule { }
