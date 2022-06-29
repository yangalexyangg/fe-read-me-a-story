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
    let src = 'images/book.png';

	let books:Book[] = [];

	const listRef = ref(storage, 'recordings');

	const getBooks = async () => {
		let url:string
		const { items } = await listAll(listRef);
		books = await Promise.all(items.map( async(item) => {
			return {
				title: await getMetadata(ref(storage, item.fullPath)).then((metadata) => metadata.customMetadata.niceName || "placeholder"),
				fileName: item.name,
				// artworkPath: "https://placekitten.com/g/200/200",
				artworkPath: src,
				url: await getDownloadURL(ref(storage, item.fullPath))
			}
		}));
	};


	onMount(() => {getBooks()});
</script>

<ul>
	<h2 class="font-Josefin text-amber-100 text-4xl font-normal text-center">Our Bookshelf</h2>
	{#each books as book}
		<li>
			<section class="bg-amber-100 max-w-xs m-auto py-5 mb-5 mt-5 rounded text-center" >
				<h2 class="text-xl">{book.title}</h2>
				<img src={book.artworkPath} alt={book.title} class="m-auto mt-4 mb-4 max-w-[13rem]">
				<a href={book.url}>{book.fileName}</a> <!--relative links are broken, placeholder for now-->
			</section>
		</li>
	{/each}
</ul>

<style></style>
