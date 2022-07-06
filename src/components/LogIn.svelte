<script lang="ts">
	import {
		onAuthStateChanged,
		signInWithEmailAndPassword,
		type UserCredential
	} from 'firebase/auth';
	import { auth } from '../utils/admin';

	import { page } from '$app/stores';
	import { familyId, userId } from '../store';

	import { fetchFamilyId } from '../utils/api-request';

	export let userLoggedIn: boolean = false;

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
			const resFamilyId = fetchFamilyId(user.uid);
			resFamilyId.then((resFamilyId) => {
				familyId.set(resFamilyId);
			});
		} else {
			userLoggedIn = false;
			userId.set('');
			familyId.set('');
		}
	});

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

<p class="mt-4 mb-2 text-center text-amber-100">
	Record and share bedtime stories<br />
	with your family
</p>

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
		<button
			type="submit"
			class="delay-5 ml-36 mb-4 rounded bg-[#b9f6ca] px-4 py-2 transition delay-150 duration-100 ease-in-out hover:-translate-y-1 hover:scale-95 hover:bg-indigo-500 hover:text-white"
			>Log in</button
		>
	</form>
</div>

<div class="flex">
	<a
		class:active={$page.url.pathname === `/register`}
		sveltekit:prefetch
		href={`/register`}
		class="m-auto mt-2 text-amber-100 underline decoration-solid decoration-2 underline-offset-4 hover:text-[#b9f6ca]"
		>Register?</a
	>
</div>
