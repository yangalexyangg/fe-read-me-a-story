<script lang="ts">
	import Header from '../components/Header.svelte';
	import Book from '../components/Book.svelte'
	import { page } from '$app/stores';
    let bookTitle = $page.params.bookTitle
</script>

<Header />

<h2 class="font-Josefin text-amber-100 text-4xl font-normal text-center">{$page.params.bookTitle}</h2>
<Book bookTitle = {bookTitle} />
<style></style>