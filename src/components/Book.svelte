<script lang="ts">
	import { fetchStory } from '../utils/api-request';
	import { onMount } from 'svelte';
	import { familyId } from '../store';
	import { ref, getDownloadURL } from 'firebase/storage';
	import { storage } from '../utils/admin';

	export let bookId: string;

	let src = 'images/book.png';
	let book = {
		title: ''
	};
	$: chapterSource = '';
	onMount(async () => {
		book = await fetchStory($familyId, bookId);
		chapterSource = await getDownloadURL(ref(storage, book.chapters[0].chapter_src));
		let audio = document.getElementById('audio');
		if (audio) {
			audio.src = chapterSource;
		}
	});
</script>

<h2 class="text-center font-Josefin text-4xl font-normal text-amber-100">{book.title}</h2>
<img {src} alt={book.title} class=" m-auto mt-4 mb-4 max-w-[13rem]" />
<audio controls class="m-auto mt-10" src={chapterSource} />
