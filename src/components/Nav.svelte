<script lang="ts">
    import { page } from '$app/stores';
</script>

<a
	class:active={$page.url.pathname === '/logout'}
	sveltekit:prefetch
	href="/logout"
	class="underline decoration-amber-100 decoration-solid decoration-2 underline-offset-4"
	><p class="text-right font-Josefin font-normal text-amber-100">Log out</p></a
>
