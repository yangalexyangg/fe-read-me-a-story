<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav class="mx-3 mb-6 flex justify-center gap-4 border-y-2 border-[#b9f6ca] py-3">
	<a class:active={$page.url.pathname === '/record'} sveltekit:prefetch href="/record"
	><p class="font-Josefin font-normal text-[#b9f6ca]">Record</p></a
	>
	<a class:active={$page.url.pathname === '/bookshelf'} sveltekit:prefetch href="/bookshelf"
		><p class="font-Josefin font-normal text-[#b9f6ca]">Bookshelf</p></a
	>
	<a class:active={$page.url.pathname === '/invite'} sveltekit:prefetch href="/invite"
		><p class="font-Josefin font-normal text-[#b9f6ca]">Invite</p></a
	>
	<a class:active={$page.url.pathname === '/logout'} sveltekit:prefetch href="/logout"
		><p class="font-Josefin font-normal text-[#b9f6ca]">Log out</p></a
	>
</nav>

