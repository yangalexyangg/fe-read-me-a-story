<script lang="ts">
	import { onMount } from 'svelte';
	import { storage } from '../utils/admin';
	import { ref, listAll } from 'firebase/storage';

	let items = [];

	const listRef = ref(storage, 'recordings');

	const getBooks = async () => {
		const res = await listAll(listRef);
		items = [...res.items];
	};

	onMount(() => getBooks());
</script>

<ul>
	{#each items as item}
		<li>{item.name}</li>
	{/each}
</ul>

<style></style>
