<script lang="ts">
  /** Fidelity-harness-only compose wrapper (NOT shipped). Nests real <TabItem>
   * buttons inside the real <Tabs> in one SSR pass — a CONTEXT-COUPLED seam
   * (the parent owns which child is --active). See the composite fixture docs
   * in fixtures/tabs-composed.json. */
  import Tabs from '../../../packages/svelte-pure-admin/src/lib/navigation/Tabs.svelte';
  import TabItem from '../../../packages/svelte-pure-admin/src/lib/navigation/TabItem.svelte';

  let { parent = {}, children = [] }: { parent?: Record<string, unknown>; children?: Record<string, unknown>[] } =
    $props();
</script>

<Tabs {...parent}>
  {#each children as c}
    <TabItem {...c} />
  {/each}
</Tabs>
