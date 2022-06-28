<script lang="ts">
	import { onMount } from 'svelte';
	import { storage } from '../utils/admin';
	import { ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage';

	interface Book {
		fileName: string,
		title: string,
		artworkPath: string,
		url: string
	}

	let books:Book[] = [];

	const listRef = ref(storage, 'recordings');

	const getBooks = async () => {
		let url:string
		const { items } = await listAll(listRef);
		books = await Promise.all(items.map( async(item) => {
			return {
				title: await getMetadata(ref(storage, item.fullPath)).then((metadata) => metadata.customMetadata.niceName || "placeholder"),
				fileName: item.name,
				artworkPath: "https://placekitten.com/g/150/150",
				url: await getDownloadURL(ref(storage, item.fullPath))
			}
		}));
	};


	onMount(() => {getBooks()});
</script>

<ul>
	{#each books as book}
		<li>
			<h2>{book.title}</h2>
			<a href={book.url}>{book.fileName}</a> <!--relative links are broken, placeholder for now-->
			<img src={book.artworkPath} alt={book.title}>
		</li>
	{/each}
</ul>

<style></style>
