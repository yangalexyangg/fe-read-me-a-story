<script lang="ts">
	import Header from '../components/Header.svelte';
	import FileUpload from '../components/FileUpload.svelte';
	import Recording from '../components/Recording.svelte';
	import Tips from '../components/Tips.svelte';
	let recordingFile: Blob;
</script>

<Header />

<h2 class="text-center font-Josefin text-4xl font-normal text-amber-100">Record A Story</h2>
<Recording bind:blob={recordingFile} />
<FileUpload {recordingFile} />
<Tips />
