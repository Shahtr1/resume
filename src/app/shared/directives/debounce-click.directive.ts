import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { debounceTime, fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[debounceClick]',
  standalone: true,
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Input() debounceTime = 300; //ms
  @Output() debounceClick = new EventEmitter<Event>();

  private sub?: Subscription;

  constructor(private host: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.sub = fromEvent(this.host.nativeElement, 'click')
      .pipe(debounceTime(this.debounceTime))
      .subscribe((ev) => this.debounceClick.emit(ev));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
