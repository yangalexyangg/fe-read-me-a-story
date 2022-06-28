<script>
	import FileUpload from 'src/components/FileUpload.svelte';
	import Header from '../components/Header.svelte';
	let fileName = 'testFile.txt';
</script>

<Header />
<h2>Record A Story</h2>
<FileUpload {fileName} />
