<script>
	import FilePicker from "./components/FilePicker.svelte";
	import axios from "axios";
	import Footer from "./components/Footer.svelte";
	import AnalysisResults from "./components/AnalysisResults.svelte";

	const env = __myapp.env;
	let analysisResults;
	let analysisError;

	const uploadFile = async (e) => {
		analysisResults = new Array();
		analysisError = "";
		try {
			const formData = new FormData();
			formData.append("slpFile", e.detail);
			const response = await axios.post(
				`${env.SERVER_URL}/api/upload-slp`,
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			analysisResults = response.data;
		} catch (error) {
			analysisError = error.response.data;
		}
	};
</script>

<main>
	<h1>SLP Pause Checker</h1>
	<div class="block is-size-7">
		Note : this won't work to detect whether a player LRAStarted
	</div>
	<FilePicker on:analyze={uploadFile} />
	<AnalysisResults results={analysisResults} error={analysisError} />
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
		margin-top: 80px;
	}

	@media (max-width: 768px) {
		h1 {
			font-size: 3em;
			margin-top: 30px;
		}
	}
</style>
