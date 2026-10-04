/**
 * Pure Admin Dialog Service (Svelte 5)
 * Promise-based programmatic dialog system
 *
 * Usage:
 *   import { dialogService, dialogStore } from '$lib/feedback/dialog-service.svelte';
 *
 *   const result = await dialogService.confirm({ title: 'Delete?', message: '...' });
 *   await dialogService.alert({ title: 'Success!', message: '...' });
 *   const value = await dialogService.prompt({ title: 'Enter name:', message: '...' });
 */

import { get } from 'svelte/store';
import { _ } from '../i18n';

// Types
export type DialogVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl';
export type DialogPosition = 'center' | 'top';

export interface BaseDialogOptions {
	title?: string;
	message?: string;
	variant?: DialogVariant;
	/**
	 * Leading masked icon in the title (`.pa-icon--*`). Pass a `pa-icon--*` name to
	 * override (e.g. `'delete'`), or `false` to hide. When omitted it is derived from
	 * `variant` — success/warning/danger/info show the matching severity mark, `primary`
	 * shows none. Mirrors core's `modal-dialogs.js` `icon` option. Since core v3.2.0.
	 */
	icon?: string | false;
	size?: DialogSize;
	position?: DialogPosition;
	closeOnBackdrop?: boolean;
	class?: string;
	bodyClass?: string;
	footerClass?: string;
}

export interface DialogButton<T = unknown> {
	/** Button label text */
	label: string;
	/** Value returned when this button is clicked */
	value: T;
	/** Button variant (defaults to 'secondary') */
	variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
	/** Whether this is an outline button */
	isOutline?: boolean;
	/** Additional CSS class for the button */
	class?: string;
	/** Whether this button should be disabled */
	disabled?: boolean;
}

export interface ConfirmDialogOptions extends BaseDialogOptions {
	confirmText?: string;
	cancelText?: string;
	confirmVariant?: DialogVariant;
}

export interface AlertDialogOptions extends BaseDialogOptions {
	okText?: string;
}

export interface PromptDialogOptions extends BaseDialogOptions {
	defaultValue?: string;
	placeholder?: string;
	confirmText?: string;
	cancelText?: string;
	validator?: (value: string) => true | string;
}

export interface CustomDialogOptions<T = unknown> extends BaseDialogOptions {
	/** Array of buttons to display */
	buttons: DialogButton<T>[];
	/** Value returned when dialog is closed via backdrop/escape (defaults to undefined) */
	dismissValue?: T;
}

export type DialogType = 'confirm' | 'alert' | 'prompt' | 'custom';

export interface DialogState {
	id: string;
	type: DialogType;
	options: ConfirmDialogOptions | AlertDialogOptions | PromptDialogOptions | CustomDialogOptions;
	resolve: (value: unknown) => void;
}

/**
 * Helper to get translation value
 */
function t(key: string): string {
	return get(_)(key);
}

// Create a reactive store class
class DialogStore {
	dialogs = $state<DialogState[]>([]);
	private counter = 0;

	add(type: DialogType, options: BaseDialogOptions): Promise<unknown> {
		return new Promise((resolve) => {
			const id = `dialog-${++this.counter}`;
			const newDialog: DialogState = {
				id,
				type,
				options,
				resolve
			};
			this.dialogs = [...this.dialogs, newDialog];
		});
	}

	close(id: string, value: unknown): void {
		const dialog = this.dialogs.find(d => d.id === id);
		if (dialog) {
			dialog.resolve(value);
			this.dialogs = this.dialogs.filter(d => d.id !== id);
		}
	}
}

// Create singleton store
export const dialogStore = new DialogStore();

/**
 * Dialog Service - Promise-based API
 */
export const dialogService = {
	/**
	 * Show a confirmation dialog
	 * @returns Promise<boolean> - true if confirmed, false if cancelled
	 */
	confirm(options: ConfirmDialogOptions = {}): Promise<boolean> {
		const defaultOptions: ConfirmDialogOptions = {
			title: t('pureAdmin.dialog.confirm'),
			message: t('pureAdmin.dialog.areYouSure'),
			confirmText: t('pureAdmin.buttons.ok'),
			cancelText: t('pureAdmin.buttons.cancel'),
			variant: 'primary',
			size: 'sm',
			position: 'center',
			closeOnBackdrop: true,
			...options
		};
		return dialogStore.add('confirm', defaultOptions) as Promise<boolean>;
	},

	/**
	 * Show an alert dialog
	 * @returns Promise<void> - resolves when user clicks OK
	 */
	alert(options: AlertDialogOptions = {}): Promise<void> {
		const defaultOptions: AlertDialogOptions = {
			title: t('pureAdmin.dialog.alert'),
			message: '',
			okText: t('pureAdmin.buttons.ok'),
			variant: 'primary',
			size: 'sm',
			position: 'center',
			closeOnBackdrop: true,
			...options
		};
		return dialogStore.add('alert', defaultOptions) as Promise<void>;
	},

	/**
	 * Show a prompt dialog
	 * @returns Promise<string | null> - string if submitted, null if cancelled
	 */
	prompt(options: PromptDialogOptions = {}): Promise<string | null> {
		const defaultOptions: PromptDialogOptions = {
			title: t('pureAdmin.dialog.input'),
			message: t('pureAdmin.dialog.enterValue'),
			defaultValue: '',
			placeholder: '',
			confirmText: t('pureAdmin.buttons.ok'),
			cancelText: t('pureAdmin.buttons.cancel'),
			variant: 'primary',
			size: 'sm',
			position: 'center',
			closeOnBackdrop: false, // Always false for prompts
			...options
		};
		return dialogStore.add('prompt', defaultOptions) as Promise<string | null>;
	},

	/**
	 * Show a custom dialog with user-defined buttons
	 * @returns Promise<T> - the value of the clicked button, or dismissValue if closed
	 */
	custom<T>(options: CustomDialogOptions<T>): Promise<T> {
		const defaultOptions: CustomDialogOptions<T> = {
			title: t('pureAdmin.dialog.defaultTitle'),
			message: '',
			variant: 'primary',
			size: 'sm',
			position: 'center',
			closeOnBackdrop: true,
			...options
		};
		return dialogStore.add('custom', defaultOptions) as Promise<T>;
	}
};
