<script lang="ts">
  import { onMount } from 'svelte'
  let media: any[] = [];
  let mediaRecorder: any = null;
  onMount(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (e: any) => media.push(e.data)
    mediaRecorder.onstop = function(){
      const audio = document.querySelector('audio');
      const blob = new Blob(media, {'type' : 'audio/ogg; codecs=opus' });
      media = []; 
      audio.src = window.URL.createObjectURL(blob);
    }
  })
  function startRecording() { mediaRecorder.start() 
                            console.log("start recording");
}
  function stopRecording() { mediaRecorder.stop()
  console.log("stop recording"); }
</script>

<section>
    <audio controls />
    <button on:click={startRecording}>Record</button>
    <button on:click={stopRecording}>Stop</button>
</section>