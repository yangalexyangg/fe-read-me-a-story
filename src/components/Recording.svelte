<script lang="ts">
  import { onMount } from 'svelte'
  let media: any[] = [];
  let mediaRecorder: any = null;
  onMount(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (event: any) => media.push(event.data)
    mediaRecorder.onstop = function(){
      const audio: any = document.querySelector('audio');
      const blob = new Blob(media, {'type' : 'audio/ogg; codecs=opus' });
      media = []; 
      audio.src = window.URL.createObjectURL(blob);
    }
  })

  function startRecording() { mediaRecorder.start() }
  function stopRecording() { mediaRecorder.stop() }
</script>

<section>
    <audio controls />
    <button on:click={startRecording}>Record</button>
    <button on:click={stopRecording}>Stop</button>
</section>