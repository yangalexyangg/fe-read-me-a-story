<script lang="ts">
	import Header from '../components/Header.svelte';
	import { page } from '$app/stores';

</script>

<Header />

<h2 class="font-Josefin text-amber-100 text-4xl font-normal text-center">{$page.params.bookTitle}</h2>

<style></style>