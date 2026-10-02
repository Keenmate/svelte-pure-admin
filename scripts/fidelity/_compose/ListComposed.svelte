<script lang="ts">
  /** Fidelity-harness-only compose wrapper (NOT shipped). Nests real <ListItem>
   * subtrees inside the real <List> in one SSR pass. See the composite fixture
   * docs in button-group-composed.json. */
  import List from '../../../packages/svelte-pure-admin/src/lib/display/List.svelte';
  import ListItem from '../../../packages/svelte-pure-admin/src/lib/display/ListItem.svelte';

  let { parent = {}, children = [] }: { parent?: Record<string, unknown>; children?: Record<string, unknown>[] } =
    $props();
</script>

<List {...parent}>
  {#each children as c}
    <ListItem {...c} />
  {/each}
</List>
