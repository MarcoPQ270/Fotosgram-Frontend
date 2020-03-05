import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSsanitizer'
})
export class DomSsanitizerPipe implements PipeTransform {

constructor(private donsanitazer: DomSanitizer) {}

  transform(img: string): any {
    return this.donsanitazer.bypassSecurityTrustUrl(img);
  }

}
