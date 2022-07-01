<script lang="ts">
	const handleSubmit = async () => {
		console.log('inviting...');
	};
</script>

<h2>Invite family members</h2>

<form on:submit|preventDefault={handleSubmit}>
	<label for="email">Enter email</label>
	<input type="email" id="email" required />
	<button type="submit">Invite!</button>
</form>
