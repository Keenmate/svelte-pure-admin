<script lang="ts">
	/**
	 * Shortcut Help Dialog
	 *
	 * Displays all registered keyboard shortcuts grouped by category.
	 * Triggered by pressing "?" key.
	 */

	import { untrack } from 'svelte';
	import { _ } from '../i18n';
	import Modal from './Modal.svelte';
	import { shortcutRegistry, formatShortcut } from '../services/shortcut-registry.svelte';
	import type { Shortcut } from '../services/shortcut-registry-types';

	interface Props {
		/** Show/hide the dialog (bindable) */
		isOpen?: boolean;
	}

	let { isOpen = $bindable(false) }: Props = $props();

	// Local state that gets updated when dialog opens
	let groupedShortcuts = $state<Map<string, Shortcut[]>>(new Map());

	// Update shortcuts when dialog opens (untrack to prevent loop)
	$effect(() => {
		if (isOpen) {
			untrack(() => {
				groupedShortcuts = shortcutRegistry.byCategory;
			});
		}
	});

	function handleClose() {
		isOpen = false;
	}
</script>

<Modal bind:isOpen size="md" titleText={$_('pureAdmin.shortcuts.title')} onclose={handleClose}>
	<div class="pa-shortcut-help">
		{#each groupedShortcuts as [category, shortcuts]}
			<div class="pa-shortcut-help__category">
				<h4 class="pa-shortcut-help__category-title">{category}</h4>
				<div class="pa-shortcut-help__list">
					{#each shortcuts as shortcut (shortcut.id)}
						<div class="pa-shortcut-help__item">
							<span class="pa-shortcut-help__keys">
								{#each formatShortcut(shortcut).split(' + ') as key, i}
									{#if i > 0}
										<span class="pa-shortcut-help__separator">+</span>
									{/if}
									<kbd class="pa-shortcut-help__key">{key}</kbd>
								{/each}
							</span>
							<span class="pa-shortcut-help__description">{shortcut.description}</span>
						</div>
					{/each}
				</div>
			</div>
		{/each}

		{#if groupedShortcuts.size === 0}
			<div class="pa-shortcut-help__empty">
				{$_('pureAdmin.shortcuts.noShortcuts')}
			</div>
		{/if}
	</div>
</Modal>
