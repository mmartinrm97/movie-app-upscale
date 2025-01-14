import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="sticky top-0 z-20 w-full bg-white/95 shadow backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95 dark:shadow-secondary transition-colors duration-300">
      <div class="container mx-auto flex justify-between h-16 items-center px-4">
        <h1 class="text-xl font-bold dark:text-white">Movie App</h1>

        <div class="flex items-center gap-4">
          <button
            (click)="toggleThemeMenu()"
            class="relative p-2 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <!-- Sun icon -->

              <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 transition-all"
              [class.-rotate-90]="isDark()"
              [class.scale-0]="isDark()"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>

              <!-- Moon icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="absolute top-2 left-2 h-5 w-5 transition-all dark:text-white"
             [class.scale-0]="!isDark()"
            [class.-rotate-90]="!isDark()"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>

          </button>

          @if (showThemeMenu()) {
            <div class="absolute top-16 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 min-w-[150px]">
              <button
                (click)="setTheme('light')"
                class="w-full px-4 py-2 text-left text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                Light
              </button>
              <button
                (click)="setTheme('dark')"
                class="w-full px-4 py-2 text-left text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                Dark
              </button>
              <button
                (click)="setTheme('system')"
                class="w-full px-4 py-2 text-left text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                System
              </button>
            </div>
          }
        </div>
      </div>
    </header>
  `
})
export class TopbarComponent {
  private readonly theme = signal<'light' | 'dark' | 'system'>('system');
  showThemeMenu = signal(false);
  isDark = signal(false);

  constructor() {
    effect(() => {
      this.updateTheme(this.theme());
    });
  }

  toggleThemeMenu() {
    this.showThemeMenu.update(v => !v);
  }

  setTheme(theme: 'light' | 'dark' | 'system') {
    this.theme.set(theme);
    this.showThemeMenu.set(false);
  }

  private updateTheme(theme: string) {
    const isDark = theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    document.documentElement.classList.toggle('dark', isDark);
    this.isDark.set(isDark);
  }
}
