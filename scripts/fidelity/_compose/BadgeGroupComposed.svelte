<script lang="ts">
  /** Fidelity-harness-only compose wrapper (NOT shipped). Nests real <Badge>
   * children inside the real <BadgeGroup> in one SSR pass. See the composite
   * fixture docs in button-group-composed.json. */
  import BadgeGroup from '../../../packages/svelte-pure-admin/src/lib/display/BadgeGroup.svelte';
  import Badge from '../../../packages/svelte-pure-admin/src/lib/display/Badge.svelte';

  let { parent = {}, children = [] }: { parent?: Record<string, unknown>; children?: Record<string, unknown>[] } =
    $props();
</script>

<BadgeGroup {...parent}>
  {#each children as c}
    <Badge {...c} />
  {/each}
</BadgeGroup>
