<script lang="ts">
	import { onMount } from 'svelte';
	import { storage } from '../utils/admin';
	import { ref, listAll } from 'firebase/storage';

	interface Book {
		fileName: string
	}

	let books:Book[] = [];

	const listRef = ref(storage, 'recordings');

	const getBooks = async () => {
		const { items } = await listAll(listRef);
		books = items.map((item) => {
			return {fileName: item.name}
		});
	};

	onMount(() => {getBooks()});
</script>

<ul>
	{#each books as book}
		<li>{book.fileName}</li>
	{/each}
</ul>

<style></style>
