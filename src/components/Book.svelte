<script lang="ts">
	import { fetchStory } from '../utils/api-request';
	import { onMount } from 'svelte';
	import { familyId } from '../store';
	import { ref, getDownloadURL } from 'firebase/storage';
	import { storage } from '../utils/admin';

	export let bookId: string;

	let src = '../images/book.png';

	interface Chapter {
		chapter_src: string;
	}

	interface Book {
		title: string;
		chapters: Chapter[];
	}
	let book: Book = {
		title: '',
		chapters: [{ chapter_src: '' }]
	};

	$: chapterSource = '';
	onMount(async () => {
		book = await fetchStory(bookId);
		chapterSource = await getDownloadURL(ref(storage, book.chapters[0].chapter_src));
		let audio = document.getElementById('audio') as HTMLAudioElement;
		if (audio) {
			audio.src = chapterSource;
		}
	});
</script>

<svelte:head>
	<title>{book.title}</title>
</svelte:head>

<div
	class="m-5  mt-20  rounded border-8 border-solid border-[#b9f6ca] bg-amber-100 py-5 text-center "
>
	<h2 class="text-center font-Josefin text-4xl font-normal ">{book.title}</h2>
	<img {src} alt={book.title} class=" m-auto mt-4 mb-4 max-w-[13rem]" />
	<audio controls class="m-auto mt-10" src={chapterSource} />
</div>
