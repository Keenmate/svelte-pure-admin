/**
 * Popover Manager - Global state for popovers
 * Ensures only one popover is open at a time and handles positioning
 */

import type { Snippet } from 'svelte';

interface PopoverState {
	id: string;
	triggerElement: HTMLElement;
	title: string;
	content: Snippet;
	header?: Snippet;
	placement: 'top' | 'end' | 'bottom' | 'start';
	size?: 'sm' | 'lg';
	textAlign?: 'center' | 'end';
}

// Global reactive state
let currentPopover = $state<PopoverState | null>(null);

export const popoverManager = {
	get current() {
		return currentPopover;
	},

	open(state: PopoverState) {
		// Close any existing popover
		if (currentPopover) {
			this.close();
		}
		currentPopover = state;
	},

	close() {
		currentPopover = null;
	},

	isOpen(id: string) {
		return currentPopover?.id === id;
	}
};
