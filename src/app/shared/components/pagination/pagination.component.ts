import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  template: `
   <div class="flex flex-col items-center space-y-4">

      <div class="flex md:hidden items-center space-x-4">
        <button
          (click)="pageChange.emit(currentPage() - 1)"
          class="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg disabled:opacity-50 transition-colors hover:bg-blue-600 dark:hover:bg-blue-700"
          [disabled]="currentPage() === 1"
        >
          Previous
        </button>

        <span class="text-sm dark:text-gray-200">
          Page {{currentPage()}} of {{totalPages()}}
        </span>

        <button
          (click)="pageChange.emit(currentPage() + 1)"
          class="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg disabled:opacity-50 transition-colors hover:bg-blue-600 dark:hover:bg-blue-700"
          [disabled]="currentPage() === totalPages()"
        >
          Next
        </button>
      </div>


      <div class="hidden md:flex items-center space-x-2">
        <button
          (click)="pageChange.emit(1)"
          class="px-3 py-1 bg-blue-500 dark:bg-blue-600 text-white rounded-lg disabled:opacity-50 transition-colors hover:bg-blue-600 dark:hover:bg-blue-700"
          [disabled]="currentPage() === 1"
        >
          «
        </button>

        <button
          (click)="pageChange.emit(currentPage() - 1)"
          class="px-3 py-1 bg-blue-500 dark:bg-blue-600 text-white rounded-lg disabled:opacity-50 transition-colors hover:bg-blue-600 dark:hover:bg-blue-700"
          [disabled]="currentPage() === 1"
        >
          ‹
        </button>

        @for (page of visiblePages(); track page) {
          <button
            (click)="pageChange.emit(page)"
            class="px-3 py-1 rounded-lg transition-colors"
            [class]="page === currentPage()
              ? 'bg-blue-500 dark:bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'"
          >
            {{page === -1 ? '...' : page}}
          </button>
        }

        <button
          (click)="pageChange.emit(currentPage() + 1)"
          class="px-3 py-1 bg-blue-500 dark:bg-blue-600 text-white rounded-lg disabled:opacity-50 transition-colors hover:bg-blue-600 dark:hover:bg-blue-700"
          [disabled]="currentPage() === totalPages()"
        >
          ›
        </button>

        <button
          (click)="pageChange.emit(totalPages())"
          class="px-3 py-1 bg-blue-500 dark:bg-blue-600 text-white rounded-lg disabled:opacity-50 transition-colors hover:bg-blue-600 dark:hover:bg-blue-700"
          [disabled]="currentPage() === totalPages()"
        >
          »
        </button>
      </div>


      <div class="flex items-center space-x-4">
        <span class="text-sm dark:text-gray-200">
          Page {{currentPage()}} of {{totalPages()}}
        </span>
        <div class="flex items-center space-x-2">
          <span class="text-sm dark:text-gray-200">Go to:</span>
          <input
            type="number"
            [min]="1"
            [max]="totalPages()"
            [value]="currentPage()"
            (change)="onJumpToPage($event)"
            class="w-16 px-2 py-1 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
          >
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  pageChange = output<number>();

  visiblePages = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    const delta = 2;
    const range: number[] = [];

    for (
      let i = Math.max(2, current - delta);
      i <= Math.min(total - 1, current + delta);
      i++
    ) {
      range.push(i);
    }

    if (current - delta > 2) {
      range.unshift(-1);
    }
    if (current + delta < total - 1) {
      range.push(-1);
    }

    range.unshift(1);
    if (total !== 1) {
      range.push(total);
    }

    return range;
  });

  onJumpToPage(event: Event) {
    const page = +(event.target as HTMLInputElement).value;
    if (page >= 1 && page <= this.totalPages()) {
      this.pageChange.emit(page);
    }
  }
}
