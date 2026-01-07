import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SwiperContainer } from 'swiper/element';
import { AdapterService } from './adapter.service';
import { appIcons } from './app-icons';

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

  @ViewChild('swiper', { read: ElementRef })
  swiperRef!: ElementRef<SwiperContainer>;

  readonly ACTIVE_MURAL_LINK =
    'https://app.mural.co/invitation/team/fixit9172?code=15043b21614948eaa63d2a5221272fb5&sender=u2c566107b20c9ed06d122316&returnUrl=%2Ft%2Ffixit9172%2Fm%2Ffixit9172%2F1766943086950%2F527bfc2190980689f33a5a61a3c6feb6e67a29b9%3Fsender%3Du2c566107b20c9ed06d122316';

  readonly downloadItems$ = this._adapter.getProjects();
  readonly news$ = this._adapter.getNews();

  ngAfterViewInit(): void {
    this._animateFloat(this._float1.nativeElement);
    this._animateFloat(this._float2.nativeElement);

    this._initSwiper();
  }

  constructor(
    private readonly _iconRegistry: MatIconRegistry,
    private readonly _sanitizer: DomSanitizer,
    private readonly _adapter: AdapterService
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

      const maxOffset = 2;
      const offsetX = (Math.random() - 0.5) * 2 * maxOffset;
      const offsetY = (Math.random() - 0.5) * 2 * maxOffset;
      const endPos = {
        x: Math.max(0, Math.min(pos.x + offsetX, heroRect.width - 150)),
        y: Math.max(0, Math.min(pos.y + offsetY, heroRect.height - 150)),
      };

      el.style.transition = 'none';
      el.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      el.style.opacity = '0';

      requestAnimationFrame(() => {
        el.style.transition =
          'transform 2s ease-in-out, opacity 1s ease-in-out';
        el.style.opacity = `${0.1}`;
        el.style.transform = `translate(${endPos.x}px, ${endPos.y}px)`;
      });

      setTimeout(() => {
        el.style.transition = 'opacity 1s ease-in-out';
        el.style.opacity = '0';

        scheduleNext();
      }, 2000 + Math.random() * 1000);
    };

    setTimeout(spawn, Math.random() * 10000);
  }

  private _initSwiper() {
    Object.assign(this.swiperRef.nativeElement, {
      slidesPerView: 1,
      spaceBetween: 16,

      breakpoints: {
        768: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 4,
        },
      },
    });

    this.swiperRef.nativeElement.initialize();
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
