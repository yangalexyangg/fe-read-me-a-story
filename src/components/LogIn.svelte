<script lang="ts">
	import {
		onAuthStateChanged,
		signInWithEmailAndPassword,
		type UserCredential
	} from 'firebase/auth';
	import { auth } from '../utils/admin';
	import { userId } from '../store';

	export let userLoggedIn: boolean = false;
	let src: string = 'images/owl-logo.png';

	interface Credential {
		username: string;
		password: string;
	}

	const credential: Credential = {
		username: '',
		password: ''
	};

	onAuthStateChanged(auth, (user) => {
		if (user) {
			userLoggedIn = true;
		} else {
			userLoggedIn = false;
		}
	});

	const handleSubmit = async () => {
		try {
			const userCredential: UserCredential = await signInWithEmailAndPassword(
				auth,
				credential.username,
				credential.password
			);
			$userId = userCredential.user.uid;
		} catch (error) {
			console.error(error);
		}
	};
</script>

<div class="flex justify-center">
	<form on:submit|preventDefault={handleSubmit} class="text-2xl">
		<label for="username" class="block text-amber-100">Email:</label>
		<input
			type="email"
			id="username"
			bind:value={credential.username}
			required
			class="mb-4 rounded bg-amber-100 p-2"
		/><br />
		<label for="password" class="block text-amber-100">Password:</label>
		<input
			type="password"
			id="password"
			bind:value={credential.password}
			required
			class="mb-6 rounded bg-amber-100 p-2"
		/><br />
		<button type="submit" class="ml-36 rounded bg-[#b9f6ca] px-4 py-2">Log in</button>
	</form>
</div>
