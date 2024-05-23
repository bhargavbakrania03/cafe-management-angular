import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBlur]',
  standalone: true
})
export class BlurDirective {

  constructor(private el: ElementRef) { }

  @HostListener('click')
  handleBlur() {
    let inputs = this.el.nativeElement.parentElement
    for (const input of inputs) {
      if (input.getAttribute('formControlName')) {
        input.blur();
      }
    }
  }

}
