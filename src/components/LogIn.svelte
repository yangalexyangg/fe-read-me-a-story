<script lang="ts">
    import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, type User, type UserCredential} from "firebase/auth"
    import {auth} from "../utils/admin"

    interface Credential {
        username:string,
        password:string,
    }

    const credential:Credential = {
        username: "",
        password: "",
    }

    const handleSubmit = async () => {
        // code belows creates an account, used here as a hack 
        // let userCredential:UserCredential = await createUserWithEmailAndPassword(auth, credential.username, credential.password)
        let userId:string = ""

        try {
            const userCredential:UserCredential = await signInWithEmailAndPassword(auth, credential.username, credential.password)
            userId = userCredential.user.uid
            
        } catch (error){
            console.error(error)
        }
    }

</script>

<form on:submit|preventDefault = {handleSubmit}>
	<label for="username" class="text-amber-100">Username:</label>
	<input type="text" id="username" bind:value = {credential.username} required class="mb-6" /><br />
	<label for="password" class="text-amber-100">Password:</label>
	<input type="password" id="password" bind:value = {credential.password} required /><br />
	<button type = "submit" class="mx-1.5 my-4 rounded bg-[#b9f6ca] px-3 py-1">Log in</button>
</form>
