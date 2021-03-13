<script>
	import FilePicker from './FilePicker.svelte';
	import axios from 'axios';

	let analyzeResult;
	let analyzeError;

	const uploadFile = async (e) => {
		analyzeResult = new Array();
		analyzeError = '';
		try {
			const formData = new FormData();

			formData.append('slpFile', e.detail);
			const response = await axios.post('http://localhost:3000/upload-slp', formData, {
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
	{#if analyzeResult}
		{#each analyzeResult as result}
			<div>{result}</div>
		{/each}
	{/if}
	{#if analyzeError}
		<div class="analyze-error">{analyzeError}</div>
	{/if}
</main>

<style>
	:global(body) {
		background-color: #222222;
		color: #ffffff;
	}
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>