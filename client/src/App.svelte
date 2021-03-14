<script>
	import FilePicker from './components/FilePicker.svelte';
	import axios from 'axios';
	import Footer from './components/Footer.svelte';

	const env = __myapp.env;
	let analyzeResult;
	let analyzeError;

	const uploadFile = async (e) => {
		analyzeResult = new Array();
		analyzeError = '';
		try {
			const formData = new FormData();

			formData.append('slpFile', e.detail);
			const response = await axios.post(`${env.SERVER_URL}/upload-slp`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			analyzeResult = response.data;
		} catch (error) {
			analyzeError = error.response.data;
		}
	}
</script>

<main>
	<h1>SLP Pause Checker</h1>
	<FilePicker on:analyze={uploadFile} />
	{#if analyzeResult?.gameDuration && analyzeResult?.pauses}
		<div>Game duration : {analyzeResult.gameDuration.minutes}min {analyzeResult.gameDuration.seconds}sec ({analyzeResult.gameDuration.frames} frames)</div>
		{#each analyzeResult.pauses as pause}
			<div>{pause.player} pauses at {pause.minute}:{pause.second} (frame {pause.frame})</div>
		{/each}
	{/if}
	{#if analyzeError}
		<div class="analyze-error">{analyzeError}</div>
	{/if}
</main>
<Footer />

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
		flex-grow: 1;
	}

	h1 {
		color: #44a963;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.analyze-error {
		color: #ff0000;
	}
</style>