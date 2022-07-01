<script lang="ts">
	let email: string = '';

	const handleSubmit = async () => {
		console.log(email);
	};
</script>

<h2>Invite family members</h2>

<form on:submit|preventDefault={handleSubmit}>
	<label for="email">Enter email</label>
	<input bind:value={email} type="email" id="email" required />
	<button type="submit">Invite!</button>
</form>
