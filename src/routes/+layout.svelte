<script lang="ts">
	import { page } from "$app/stores";
	import { handleSession } from "@lucia-auth/sveltekit/client";
  import '../styles/reset.css'
  import '../styles/global.css'
  import '../styles/utils.css'
  
	handleSession(page);
</script>

<slot />