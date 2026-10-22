/**
 * Button ripple — mirrors pure-admin-core's src/js/ripple.js.
 *
 * The CSS (`.pa-btn--ripple`) draws the circle; `playRipple` places it at
 * the click point, adds `.pa-btn--ripple-active` and removes it once the
 * theme's animation has run. `<Button isRipple>` attaches it via the `ripple`
 * action — a native listener on the element, so it still plays when an
 * earlier click handler disables the button (Svelte's delegated `onclick`
 * skips disabled targets).
 */
const ACTIVE = 'pa-btn--ripple-active';
const timers = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>();

function toMs(v: string): number {
	const n = parseFloat(v.split(',')[0]);
	if (Number.isNaN(n)) return 0;
	return v.trim().endsWith('ms') ? n : n * 1000;
}

// When the last running layer ends — the ::before ink, the ::after halo, the
// delayed second halo of --ripple-double-pulse, or the button itself — so a
// product's own ripple types (any .pa-btn--ripple-<name>) are timed too.
function durationMs(el: HTMLElement): number {
	let max = 0;
	for (const pseudo of [null, '::before', '::after']) {
		const cs = getComputedStyle(el, pseudo);
		if (cs.animationName && cs.animationName !== 'none') {
			max = Math.max(max, toMs(cs.animationDuration) + toMs(cs.animationDelay));
		}
	}
	return max || 450;
}

// Grow from the click point, sized to reach the farthest corner.
// Keyboard clicks (detail 0) start from the centre.
function place(el: HTMLElement, event?: MouseEvent): void {
	const r = el.getBoundingClientRect();
	const fromPointer = !!event && event.detail > 0;
	const x = fromPointer ? event!.clientX - r.left : r.width / 2;
	const y = fromPointer ? event!.clientY - r.top : r.height / 2;
	const dx = Math.max(x, r.width - x);
	const dy = Math.max(y, r.height - y);
	el.style.setProperty('--pa-ripple-x', `${x}px`);
	el.style.setProperty('--pa-ripple-y', `${y}px`);
	el.style.setProperty('--pa-ripple-size', `${2 * Math.sqrt(dx * dx + dy * dy)}px`);
}

export function playRipple(el: HTMLElement | null | undefined, event?: MouseEvent): void {
	if (!el) return;
	clearTimeout(timers.get(el));
	place(el, event);
	// Restart on rapid re-clicks: drop the class, force a reflow, re-add.
	el.classList.remove(ACTIVE);
	void el.offsetWidth;
	el.classList.add(ACTIVE);
	timers.set(
		el,
		setTimeout(() => el.classList.remove(ACTIVE), durationMs(el))
	);
}

/** Svelte action: `use:ripple={enabled}` plays the ripple on every click while enabled. */
export function ripple(node: HTMLElement, enabled: boolean = true) {
	let on = enabled;
	const handler = (event: MouseEvent) => {
		if (on) playRipple(node, event);
	};
	node.addEventListener('click', handler);
	return {
		update(next: boolean) {
			on = next;
		},
		destroy() {
			node.removeEventListener('click', handler);
		}
	};
}
