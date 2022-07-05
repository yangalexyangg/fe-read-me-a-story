<script lang="ts">
	import {
		onAuthStateChanged,
		signInWithEmailAndPassword,
		type UserCredential
	} from 'firebase/auth';
	import { auth } from '../utils/admin';

	import { page } from '$app/stores';
	import { familyId, userId } from '../store';

	import {fetchFamilyId} from '../utils/api-request'

	export let userLoggedIn: boolean = false;
	let src: string = 'images/owl-logo.png';

	interface Credential {
		email: string;
		password: string;
	}

	const credential: Credential = {
		email: '',
		password: ''
	};

	onAuthStateChanged(auth, (user) => {
		if (user) {
			userLoggedIn = true;
			userId.set(user.uid);
			const resFamilyId = fetchFamilyId(user.uid)
			resFamilyId.then((resFamilyId)=>{familyId.set(resFamilyId)})
		} else {
			userLoggedIn = false;
			userId.set('');
			familyId.set('');
		}
	});
	
	console.log($familyId)
	const handleSubmit = async () => {
		try {
			const userCredential: UserCredential = await signInWithEmailAndPassword(
				auth,
				credential.email,
				credential.password
			);

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
			bind:value={credential.email}
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
		<button type="submit" class="ml-36 mb-4 rounded bg-[#b9f6ca] px-4 py-2">Log in</button>
	</form>
</div>

<a
	class:active={$page.url.pathname === `/register`}
	sveltekit:prefetch
	href={`/register`}
	class="mt-4 ml-60 text-amber-100 underline decoration-solid decoration-2 underline-offset-4"
	>Register?</a
>
