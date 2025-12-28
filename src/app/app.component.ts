import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { appIcons } from './app-icons';

interface IDownloadItem {
  readonly name: string;
  readonly icon: string;
  readonly description: string;
  readonly fileUrl: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  @ViewChild('float1', { static: false })
  _float1!: ElementRef<HTMLImageElement>;
  @ViewChild('float2', { static: false })
  _float2!: ElementRef<HTMLImageElement>;

  readonly ACTIVE_MURAL_LINK =
    'https://app.mural.co/invitation/team/fixit9172?code=15043b21614948eaa63d2a5221272fb5&sender=u2c566107b20c9ed06d122316&returnUrl=%2Ft%2Ffixit9172%2Fm%2Ffixit9172%2F1766943086950%2F527bfc2190980689f33a5a61a3c6feb6e67a29b9%3Fsender%3Du2c566107b20c9ed06d122316';

  readonly downloadItems: readonly IDownloadItem[] = [
    {
      name: 'Fix It!',
      icon: 'fixit_icon',
      description:
        'You play as an electrician, your job is to to find issued, buy parts and fix the house while the clock is ticking.',
      fileUrl:
        'https://drive.google.com/uc?export=download&id=1r3WSXn-xt7BFxXD3ISq0dR-GXTLgp90u',
    },
  ];

  ngAfterViewInit(): void {
    this._animateFloat(this._float1.nativeElement);
    this._animateFloat(this._float2.nativeElement);
  }

  constructor(
    private readonly _iconRegistry: MatIconRegistry,
    private readonly _sanitizer: DomSanitizer
  ) {
    this._registerSvgIcons();
  }

  onDownload(fileUrl: string): void {
    window.location.href = fileUrl;
  }

  private _animateFloat(el: HTMLElement): void {
    const hero = document.querySelector('.hero__container')!;
    const heroRect = hero.getBoundingClientRect();

    const getRandomPosition = () => ({
      x: Math.random() * (heroRect.width - 150),
      y: Math.random() * (heroRect.height - 150),
    });

    const scheduleNext = () => {
      const delay = 8000 + Math.random() * 10000; // 8-18s before next spawn
      setTimeout(() => spawn(), delay);
    };

    const spawn = () => {
      const pos = getRandomPosition();

      // Tiny movement offset (barely visible)
      const maxOffset = 2; // ±2px
      const offsetX = (Math.random() - 0.5) * 2 * maxOffset;
      const offsetY = (Math.random() - 0.5) * 2 * maxOffset;
      const endPos = {
        x: Math.max(0, Math.min(pos.x + offsetX, heroRect.width - 150)),
        y: Math.max(0, Math.min(pos.y + offsetY, heroRect.height - 150)),
      };

      // Set initial position instantly
      el.style.transition = 'none';
      el.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      el.style.opacity = '0';

      requestAnimationFrame(() => {
        el.style.transition =
          'transform 2s ease-in-out, opacity 1s ease-in-out';
        el.style.opacity = `${0.1}`;
        el.style.transform = `translate(${endPos.x}px, ${endPos.y}px)`;
      });

      // Fade out after short visible time
      setTimeout(() => {
        el.style.transition = 'opacity 1s ease-in-out';
        el.style.opacity = '0';

        scheduleNext(); // schedule next appearance
      }, 2000 + Math.random() * 1000); // visible 2-3s
    };

    // Initial random delay
    setTimeout(spawn, Math.random() * 10000);
  }

  private _registerSvgIcons(): void {
    for (const icon of appIcons) {
      this._iconRegistry.addSvgIcon(
        icon.name,
        this._sanitizeIconPath(icon.path)
      );
    }
  }

  private _sanitizeIconPath(path: string): SafeResourceUrl {
    return this._sanitizer.bypassSecurityTrustResourceUrl(path);
  }
}
