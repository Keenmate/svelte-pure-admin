# TypeScript Type Patterns

## Variants

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

type AlertVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
```

## Sizes

```typescript
type Size = 'xs' | 'sm' | 'lg' | 'xl';
```

## Logical alignment (RTL-aware)

```typescript
type HorizontalAlignment = 'start' | 'center' | 'end';
```

## Toast placements (logical, RTL-aware)

```typescript
type ToastPlacement =
  | 'top-end' | 'top-center' | 'top-start'
  | 'bottom-end' | 'bottom-center' | 'bottom-start';
```

Physical positions (`top-right`, `top-left`, etc.) were removed in v1.4.0.

## Theme colour slots

```typescript
type ThemeColor = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
```

Applied via `themeColor` prop on Alert, Button, Callout, Toast (core v2.2.0+).

## Sentiment scale (Stat `ChangeDirection`)

```typescript
type ChangeDirection = 'very-positive' | 'positive' | 'neutral' | 'negative' | 'very-negative';
```

Direction-of-change (ordinal) — distinct from role colours which are urgency (categorical).

## Snippet type

```typescript
children?: import('svelte').Snippet;
```
