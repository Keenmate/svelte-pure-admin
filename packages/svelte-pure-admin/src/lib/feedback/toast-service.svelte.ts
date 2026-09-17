/**
 * Pure Admin Toast Service (Svelte 5)
 * Programmatic toast notification system, mirrors the dialog-service pattern.
 *
 * Usage:
 *   import { toastService } from '$lib/feedback/toast-service.svelte';
 *
 *   toastService.success('Saved!');
 *   toastService.show({
 *     variant: 'danger',
 *     titleText: 'Failed',
 *     messageText: 'Could not save record',
 *     actions: [
 *       { label: 'Retry', variant: 'secondary', onclick: id => retry(id) }
 *     ],
 *     duration: 0,         // persistent until user dismisses
 *     maxWidth: '50rem'
 *   });
 *
 *   const id = toastService.show({ titleText: 'Working', messageText: '...' });
 *   toastService.dismiss(id);
 *
 * Mount once in your layout:
 *   <ToastContainer position="top-end" />
 */

import type { ThemeColor } from '../types';

export type ToastVariant = 'primary' | 'success' | 'danger' | 'warning' | 'info';

export type ToastPosition =
	| 'top-end'
	| 'top-center'
	| 'top-start'
	| 'bottom-end'
	| 'bottom-center'
	| 'bottom-start';

/** Default position used when a toast or container doesn't specify one. */
export const DEFAULT_TOAST_POSITION: ToastPosition = 'top-end';

export interface ToastAction {
	/** Button label */
	label: string;
	/** Button variant (defaults to 'secondary') */
	variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
	/** Outline style */
	isOutline?: boolean;
	/**
	 * Click handler. Receives the toast id so the handler can dismiss
	 * a different toast or keep this one open. After it returns the toast
	 * is auto-dismissed unless `keepOpen` is true.
	 */
	onclick?: (id: string) => void;
	/** When true, the toast stays open after this action fires */
	keepOpen?: boolean;
}

export interface ToastOptions {
	/** Toast title */
	titleText: string;
	/** Toast message */
	messageText: string;
	/** Variant (color slot — primary/success/danger/warning/info) */
	variant?: ToastVariant;
	/** Theme color slot variant (1-9) — overrides variant */
	themeColor?: ThemeColor;
	/** Filled style — full-color background with contrast text */
	isFilled?: boolean;
	/** Auto-dismiss duration in ms; 0 means persistent (user must dismiss) */
	duration?: number;
	/** Show progress bar */
	shouldShowProgress?: boolean;
	/** Custom progress bar color (CSS color value) */
	progressColor?: string;
	/** Custom max-width (e.g. '50rem', '500px') */
	maxWidth?: string;
	/** Action buttons rendered inside pa-toast__actions */
	actions?: ToastAction[];
	/**
	 * Optional icon override (e.g. a FontAwesome class like 'fas fa-check-circle').
	 * By default the toast paints the masked severity glyph derived from `variant`
	 * (core 3.1.0 `.pa-icon--info/success/warning/danger`); set this only to
	 * substitute a custom glyph.
	 */
	iconClass?: string;
	/** Additional CSS classes on the toast root */
	class?: string;
	/**
	 * Which container this toast routes to. Defaults to 'top-end'.
	 * Mount one `<ToastContainer position="..." />` per position you intend to use.
	 */
	position?: ToastPosition;
}

export interface ToastState extends ToastOptions {
	id: string;
}

class ToastStore {
	toasts = $state<ToastState[]>([]);
	private counter = 0;

	add(options: ToastOptions): string {
		const id = `toast-${++this.counter}`;
		this.toasts = [...this.toasts, { ...options, id }];
		return id;
	}

	dismiss(id: string): void {
		this.toasts = this.toasts.filter(t => t.id !== id);
	}

	dismissAll(): void {
		this.toasts = [];
	}
}

export const toastStore = new ToastStore();

type SugarInput = string | (Partial<ToastOptions> & { messageText?: string; titleText?: string });

function sugar(variant: ToastVariant, defaultTitle: string, input: SugarInput): string {
	const options: ToastOptions =
		typeof input === 'string'
			? { variant, titleText: defaultTitle, messageText: input }
			: { variant, titleText: defaultTitle, messageText: '', ...input };
	return toastStore.add(options);
}

export const toastService = {
	/**
	 * Show a toast with full options. Returns the toast id so it can be
	 * dismissed programmatically later.
	 */
	show(options: ToastOptions): string {
		return toastStore.add(options);
	},

	/** Sugar — `toastService.success('Saved!')` or `.success({ titleText, messageText, ... })` */
	success(input: SugarInput): string {
		return sugar('success', 'Success', input);
	},

	danger(input: SugarInput): string {
		return sugar('danger', 'Error', input);
	},

	warning(input: SugarInput): string {
		return sugar('warning', 'Warning', input);
	},

	info(input: SugarInput): string {
		return sugar('info', 'Info', input);
	},

	primary(input: SugarInput): string {
		return sugar('primary', 'Notice', input);
	},

	/** Dismiss a specific toast by id */
	dismiss(id: string): void {
		toastStore.dismiss(id);
	},

	/** Dismiss every active toast */
	dismissAll(): void {
		toastStore.dismissAll();
	}
};
