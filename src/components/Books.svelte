<script lang="ts">
	import { onMount } from 'svelte';
	import { storage } from '../utils/admin';
	import { ref, listAll } from 'firebase/storage';

	interface Book {
		fileName: string,
		title: string,
		artworkPath: string,
		fullPath: string
	}

	let books:Book[] = [];

	const listRef = ref(storage, 'recordings');

	const getBooks = async () => {
		const { items } = await listAll(listRef);
		books = items.map((item) => {
			return {fileName: item.name, title: "placeholder title", artworkPath: "https://placekitten.com/g/150/150", fullPath: item.fullPath}
		});
	};

	onMount(() => {getBooks()});
</script>

<ul>
	{#each books as book}
		<li>
			<h2>{book.title}</h2>
			<a href={book.fullPath}>{book.fileName}</a> <!--relative links are broken, placeholder for now-->
			<img src={book.artworkPath} alt={book.title}>
		</li>
	{/each}
</ul>

<style></style>
