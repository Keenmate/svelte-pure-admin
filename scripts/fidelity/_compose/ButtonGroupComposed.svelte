<script lang="ts">
  /**
   * Fidelity-harness-only compose wrapper (NOT shipped). Demonstrates a
   * COMPOSITE (tree) fixture: it nests the REAL <Button> children inside the
   * REAL <ButtonGroup> in a single SSR render pass, so the dump is the whole
   * composed tree — exercising the parent↔child seam a container-only fixture
   * (text placeholder in the slot) skips.
   *
   * The dumper (scripts/fidelity/dump.mjs composite path) passes `group`
   * (the parent's mapped props) and `buttons` (each child's mapped props,
   * including its `children` label snippet). We spread each straight onto the
   * real components.
   */
  import ButtonGroup from '../../../packages/svelte-pure-admin/src/lib/buttons/ButtonGroup.svelte';
  import Button from '../../../packages/svelte-pure-admin/src/lib/buttons/Button.svelte';

  let { parent = {}, children = [] }: { parent?: Record<string, unknown>; children?: Record<string, unknown>[] } =
    $props();
</script>

<ButtonGroup {...parent}>
  {#each children as c}
    <Button {...c} />
  {/each}
</ButtonGroup>
