<script>
  import { Switch } from "@rgossiaux/svelte-headlessui";
  export let enabled = false;
</script>

<Switch
  checked={enabled}
  on:change={(e) => (enabled = e.detail)}
  class="inline-flex shrink-0 h-[24px] w-[44px] items-center rounded-full {enabled ? "bg-slate-800" : "bg-slate-200"}"
>
  <span class="block h-[21px] w-[21px] rounded-full bg-white shadow-lg {enabled ? "translate-x-full" : "translate-x-0"}"/>
</Switch>
