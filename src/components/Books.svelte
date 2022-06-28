<script lang="ts">
	import { onMount } from 'svelte';
	import { storage } from '../utils/admin';
	import { ref, listAll, getMetadata } from 'firebase/storage';

	let books = [];

	const listRef = ref(storage, 'recordings');

	const getNiceName = (fullPath) => {
		const bookRef = ref(storage, fullPath);
		return getMetadata(bookRef)
			.then((metadata) => {
				if (metadata.customMetadata) {
					return metadata.customMetadata.niceName;
				} else {
					return '';
				}
			})
			.catch((err) => console.log(err));
	};

	const getBooks = async () => {
		const { items } = await listAll(listRef);
		books = items.map((item) => {
			getNiceName(item.fullPath).then((niceName) => {
				return { name: item.name, niceName };
			});
		});
	};

	onMount(() => getBooks());
</script>

<ul>
	{#each books as book}
		<li>{book.name} - {book.niceName}</li>
	{/each}
</ul>

<style></style>
