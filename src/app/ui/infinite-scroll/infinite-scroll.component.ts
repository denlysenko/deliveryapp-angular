import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'da-infinite-scroll',
  template: `
    <ng-content></ng-content>
    <div #anchor></div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class InfiniteScrollComponent implements AfterViewInit, OnDestroy {
  @Output() scrolled = new EventEmitter<void>();

  @ViewChild('anchor', { static: false }) anchor: ElementRef<HTMLElement>;

  private observer: IntersectionObserver;

  ngAfterViewInit() {
    const options = {
      root: null
    };

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.scrolled.emit();
      }
    }, options);

    this.observer.observe(this.anchor.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
