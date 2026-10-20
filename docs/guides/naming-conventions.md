# Naming Conventions (KeenMate Standard)

Self-documenting prop names: the suffix or prefix tells you the type and purpose.

## Suffixes

**`*Member`** — property mappings (which field in a data object to use). Examples: `idMember`, `displayValueMember`. Rarely used in Pure Admin (no data binding), but follow the pattern when needed.

**`*Callback`** — only when the return value controls component behavior:
- `beforeCloseCallback` — returns `false` to prevent close
- `get*Callback` — returns data for rendering (e.g. `getDisplayValueCallback`, `getVariantCallback`)
- `copyValueCallback` — returns a string for clipboard
- NOT for fire-and-forget notifications (use `on*` instead)

**`*Class`** — CSS class strings: `bodyClass`, `selectedNodeClass`, `expandIconClass`. Exception: standard `class` prop for additional custom classes.

**`*Timeout`** — durations in milliseconds: `scrollHighlightTimeout`, `indexerTimeout`.

## Event handlers

**`on*` (lowercase)** — fire-and-forget event notifications. Svelte 5 uses native DOM event syntax, so handlers are fully lowercase.

- DOM event forwarders: `onclick`, `onchange`, `oninput`, `onblur`, `onfocus`
- Custom component events: `onclose`, `onconfirm`, `ondismiss`, `onbadgeclick`, `onpagechange`

NOT `onClick` / `onChange` (camelCase) and NOT `closeCallback` / `confirmCallback` for fire-and-forget events.

## Boolean prefixes

Every boolean prop follows one of three prefixes — native HTML attributes included (the component emits the native attribute internally):

**`is*`** — state (what something is): `isDisabled`, `isReadonly`, `isRequired`, `isChecked`, `isOpen` (overlays), `isTouched`, `isMultiline`.

**`has*`** — a part is shown: `hasClose`, `hasBackdrop`, `hasProgress`, `hasInfo`, `hasBorder`. A part that is on by default is turned off with `hasX={false}` (never `noX` / `showX`).

**`should*`** — behaviour (what the component should do): `shouldAutofocus`, `shouldKeepOpen`, `shouldCloseOnEscape`, `shouldRenderHtml`, `shouldSnapToTicks`.

## Text vs rich content

- **`*Text`** — a plain string: `titleText`, `labelText`, `countText`, `iconText`. Applies even when the string lands in a native attribute (`titleText` → `title="…"`).
- **Bare name** — the rich snippet for the same slot: `title`, `label`, `icon`, `footer`; `children` is the main content.
- **`iconName`** — an icon by name, rendered through `<Icon>` (the configured icon providers resolve it); the `icon` snippet wins when both are given.

## Enums

One enum, named for what it controls, whenever options exclude each other:

- `variant` — role colour (primary / success / warning / danger / info …); `themeColor` — the 1–9 theme palette slot.
- `type` — which predefined design (`Loader type`, `Tabs type`, range `handleType`).
- `mode` — which behaviour (`copyMode`, card `titleTooltipMode`).
- `layout` — how the children are arranged; `density` — `compact` / `relaxed` spacing; `size` — size scale.
- Layout props use the CSS property name: `justify` (justify-content), `align` (align-items), `textAlign` (text-align).
- `placement` — where the component itself sits (tooltip, modal, toast); `<part>Placement` — where one of its parts sits (`labelPlacement`, `iconPlacement`).
- `style` is only ever the native inline CSS string.

The authoritative list is `ai/naming-conventions.txt` (shipped with the package) and core's `fidelity/NAMING.md`; core's `npm run fidelity:naming -w @keenmate/pure-admin-core` (run in ../pure-admin) checks that keen-pure-admin uses the same names.

## Pure Admin specific rules

- Keep `class` prop as-is (standard Svelte convention).
- Use `on*` (lowercase) for all fire-and-forget events.
- Use `*Callback` suffix only when the return value is used internally.
- Every boolean is `is*` / `has*` / `should*` — no exception for native attributes.
- Same names as keen-pure-admin (camelCase here, snake_case there); no backward-compat aliases.
