import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Directive, Output, HostBinding, HostListener } from '@angular/core';
import { EventEmitter } from '@angular/core';
export interface FileHandle {
  file: File;
  url: SafeUrl;
}

@Directive({
  selector: '[appDrag]'
})
export class DragAndDropDirective {
  @Output() files: EventEmitter<FileHandle[]> = new EventEmitter();

  @HostBinding('style.background') private background = '#fffdfc';

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener('dragover', ['$event']) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#23376e';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#fffdfc';
  }

  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#fffdfc';

    const files: FileHandle[] = [];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < evt.dataTransfer.files.length; i++) {
      const file = evt.dataTransfer.files[i];
      const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      files.push({ file, url });
    }
    if (files.length > 0) {
      this.files.emit(files);
    }
  }
}
