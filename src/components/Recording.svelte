<script lang="ts">
	import { onMount } from 'svelte';
	import { recordingIsDisabled, stopIsDisabled, uploadIsDisabled, resetIsDisabled } from '../store';

	let media: any[] = [];
	let mediaRecorder: MediaRecorder;
	let url: string = '';
	export let blob: Blob;

	onMount(async () => {
		const stream: MediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
		mediaRecorder = new MediaRecorder(stream);
		mediaRecorder.ondataavailable = (event: BlobEvent) => media.push(event.data);
		mediaRecorder.onstop = () => {
			const audio: HTMLAudioElement | null = document.querySelector('audio');
			blob = new Blob(media, { type: 'audio/ogg; codecs=opus' });
			media = [];
			url = URL.createObjectURL(blob);
			if (audio) {
				audio.src = url;
			}
		};
	});

	function startRecording() {
		mediaRecorder.start();
		$recordingIsDisabled = true;
		$resetIsDisabled = true;
	}

	function stopRecording() {
		mediaRecorder.stop();
		$stopIsDisabled = true;
		$resetIsDisabled = false;
		uploadIsDisabled.set(true);
	}

	const resetRecording = () => {
		// clear file reference in the browser
		URL.revokeObjectURL(url);
		const audio: HTMLAudioElement | null = document.querySelector('audio');
		if (audio) {
			// reset native audio player state interface
			audio.pause();
			audio.currentTime = 0;
			// clearing AND resetting is required to supress warnings in firefox
			audio.src = '';
			audio.removeAttribute('src');
		}
		$recordingIsDisabled = false;
		$stopIsDisabled = false;
		$uploadIsDisabled = false;
		$resetIsDisabled = true;
	};
</script>

<section class="text-center">
	<button
		disabled={$recordingIsDisabled}
		on:click={startRecording}
		class={$recordingIsDisabled
			? 'bg-slate-400 px-3 py-1 rounded mx-1.5 my-4'
			: 'bg-[#b9f6ca] px-3 py-1 rounded mx-1.5 my-4'}>Record</button
	>
	<button
		disabled={$stopIsDisabled}
		on:click={stopRecording}
		class={$stopIsDisabled
			? 'bg-slate-400 px-3 py-1 rounded mx-1.5 my-4'
			: 'bg-[#b9f6ca] px-3 py-1 rounded mx-1.5 my-4'}>Stop</button
	>
	<button
		disabled={$resetIsDisabled}
		on:click={resetRecording}
		class={$resetIsDisabled
			? 'bg-slate-400 px-3 py-1 rounded mx-1.5 my-4'
			: 'bg-[#b9f6ca] px-3 py-1 rounded mx-1.5 my-4'}>Reset</button
	>
	<audio controls class="m-auto" />
</section>
