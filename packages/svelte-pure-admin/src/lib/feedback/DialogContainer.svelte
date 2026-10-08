<script lang="ts">
	/**
	 * Pure Admin Dialog Container (Svelte 5)
	 * Renders all active dialogs from the dialog service
	 *
	 * Place this component once in your layout:
	 *   <DialogContainer />
	 */

	import { _ } from '../i18n';
	import {
		dialogStore,
		type DialogState,
		type ConfirmDialogOptions,
		type AlertDialogOptions,
		type PromptDialogOptions,
		type CustomDialogOptions
	} from './dialog-service.svelte';
	import Modal from './Modal.svelte';
	import Button from '../buttons/Button.svelte';
	import FormGroup from '../forms/FormGroup.svelte';
	import Input from '../forms/Input.svelte';
	import Paragraph from '../typography/Paragraph.svelte';

	// Get dialogs reactively via getter
	const dialogs = $derived(dialogStore.dialogs);

	// Leading masked title icon — mirrors core's modal-dialogs.js: an explicit `icon`
	// overrides (or `false` hides), otherwise it's derived from `variant` (primary → none).
	const severityIcon: Record<string, string> = {
		success: 'success',
		warning: 'warning',
		danger: 'danger',
		info: 'info'
	};
	function resolveTitleIcon(options: DialogState['options']): string | undefined {
		if (options.icon === false) return undefined;
		if (typeof options.icon === 'string') return options.icon;
		return options.variant ? severityIcon[options.variant] : undefined;
	}

	// Track input values and errors for prompt dialogs
	let inputValues = $state<Record<string, string>>({});
	let inputErrors = $state<Record<string, string>>({});

	// Initialize input value when prompt dialog opens
	$effect(() => {
		for (const dialog of dialogs) {
			if (dialog.type === 'prompt') {
				const options = dialog.options as PromptDialogOptions;
				if (!(dialog.id in inputValues)) {
					inputValues[dialog.id] = options.defaultValue || '';
				}
			}
		}
	});

	function handleConfirm(dialog: DialogState) {
		dialogStore.close(dialog.id, true);
	}

	function handleCancel(dialog: DialogState) {
		dialogStore.close(dialog.id, dialog.type === 'confirm' ? false : null);
	}

	function handleOk(dialog: DialogState) {
		dialogStore.close(dialog.id, undefined);
	}

	function handlePromptSubmit(dialog: DialogState) {
		const options = dialog.options as PromptDialogOptions;
		const value = inputValues[dialog.id] || '';

		// Validate if validator is provided
		if (options.validator) {
			const result = options.validator(value);
			if (result !== true) {
				inputErrors[dialog.id] = typeof result === 'string' ? result : $_('pureAdmin.dialog.invalidInput');
				return;
			}
		}

		// Clear error and close
		delete inputErrors[dialog.id];
		dialogStore.close(dialog.id, value);
	}

	function handlePromptCancel(dialog: DialogState) {
		delete inputErrors[dialog.id];
		dialogStore.close(dialog.id, null);
	}

	function handleInputChange(dialogId: string, value: string) {
		inputValues[dialogId] = value;
		// Clear error on input change
		if (inputErrors[dialogId]) {
			delete inputErrors[dialogId];
		}
	}

	function handleCustomButton(dialog: DialogState, value: unknown) {
		dialogStore.close(dialog.id, value);
	}

	function handleCustomDismiss(dialog: DialogState) {
		const options = dialog.options as CustomDialogOptions;
		dialogStore.close(dialog.id, options.dismissValue);
	}

	function handleKeydown(e: KeyboardEvent, dialog: DialogState) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			if (dialog.type === 'confirm') {
				handleConfirm(dialog);
			} else if (dialog.type === 'alert') {
				handleOk(dialog);
			} else if (dialog.type === 'prompt') {
				handlePromptSubmit(dialog);
			}
		}
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'Escape' && dialogs.length > 0) {
			const topDialog = dialogs[dialogs.length - 1];
			if (topDialog.type === 'confirm') {
				handleCancel(topDialog);
			} else if (topDialog.type === 'alert') {
				handleOk(topDialog);
			} else if (topDialog.type === 'prompt') {
				handlePromptCancel(topDialog);
			} else if (topDialog.type === 'custom') {
				handleCustomDismiss(topDialog);
			}
		}
	}}
/>

{#each dialogs as dialog (dialog.id)}
	{@const options = dialog.options}
	<Modal
		show={true}
		size={options.size || 'sm'}
		variant={options.variant}
		isBanded={options.isBanded ?? false}
		shouldShowClose={false}
		shouldCloseOnBackdrop={options.closeOnBackdrop !== false}
		position={options.position || 'center'}
		titleText={options.title}
		titleIcon={resolveTitleIcon(options)}
		class={options.class}
		bodyClass={options.bodyClass}
		footerClass={options.footerClass}
		onclose={() => {
			if (dialog.type === 'confirm') handleCancel(dialog);
			else if (dialog.type === 'alert') handleOk(dialog);
			else if (dialog.type === 'prompt') handlePromptCancel(dialog);
			else if (dialog.type === 'custom') handleCustomDismiss(dialog);
		}}
	>
		{#snippet footer()}
			{#if dialog.type === 'confirm'}
				{@const confirmOptions = options as ConfirmDialogOptions}
				<Button variant="secondary" onclick={() => handleCancel(dialog)}>
					{confirmOptions.cancelText || $_('pureAdmin.buttons.cancel')}
				</Button>
				<Button
					variant={confirmOptions.confirmVariant || confirmOptions.variant || 'primary'}
					onclick={() => handleConfirm(dialog)}
				>
					{confirmOptions.confirmText || $_('pureAdmin.buttons.ok')}
				</Button>
			{:else if dialog.type === 'alert'}
				{@const alertOptions = options as AlertDialogOptions}
				<Button variant={alertOptions.variant || 'primary'} onclick={() => handleOk(dialog)}>
					{alertOptions.okText || $_('pureAdmin.buttons.ok')}
				</Button>
			{:else if dialog.type === 'prompt'}
				{@const promptOptions = options as PromptDialogOptions}
				<Button variant="secondary" onclick={() => handlePromptCancel(dialog)}>
					{promptOptions.cancelText || $_('pureAdmin.buttons.cancel')}
				</Button>
				<Button variant={promptOptions.variant || 'primary'} onclick={() => handlePromptSubmit(dialog)}>
					{promptOptions.confirmText || $_('pureAdmin.buttons.ok')}
				</Button>
			{:else if dialog.type === 'custom'}
				{@const customOptions = options as CustomDialogOptions}
				{#each customOptions.buttons as button}
					<Button
						variant={button.variant || 'secondary'}
						isOutline={button.isOutline}
						class={button.class}
						disabled={button.disabled}
						onclick={() => handleCustomButton(dialog, button.value)}
					>
						{button.label}
					</Button>
				{/each}
			{/if}
		{/snippet}

		{#if dialog.type === 'confirm'}
			{@const confirmOptions = options as ConfirmDialogOptions}
			<Paragraph>{confirmOptions.message}</Paragraph>
		{:else if dialog.type === 'alert'}
			{@const alertOptions = options as AlertDialogOptions}
			<Paragraph>{alertOptions.message}</Paragraph>
		{:else if dialog.type === 'prompt'}
			{@const promptOptions = options as PromptDialogOptions}
			<Paragraph>{promptOptions.message}</Paragraph>
			<FormGroup class="mt-4">
				<Input
					type="text"
					value={inputValues[dialog.id] || ''}
					placeholder={promptOptions.placeholder}
					state={inputErrors[dialog.id] ? 'error' : undefined}
					oninput={(e) => handleInputChange(dialog.id, e.currentTarget.value)}
					onkeydown={(e) => handleKeydown(e, dialog)}
				/>
				{#if inputErrors[dialog.id]}
					<small class="text-danger">{inputErrors[dialog.id]}</small>
				{/if}
			</FormGroup>
		{:else if dialog.type === 'custom'}
			{@const customOptions = options as CustomDialogOptions}
			{#if customOptions.message}
				<Paragraph>{customOptions.message}</Paragraph>
			{/if}
		{/if}
	</Modal>
{/each}
