// temp imports for testing front end, replace with python!
import { createUserWithEmailAndPassword, type UserCredential } from 'firebase/auth';
import { auth } from './admin';
// end of temp imports

import axios from 'axios';

const apiCall = axios.create({ baseURL: 'http://127.0.0.1:5000' });

export const fetchStories = () => {
	return apiCall.get('/stories').then((res) => {
		return res.data;
	});
};

export const postStory = (story: any) => {
	return apiCall.post('/stories', story).then((res) => {
		return res.data;
	});
};

export const fetchUserStatus = (email: string) => {
	return Promise.resolve('not found');
};

export const createNewUserAndFamily = async (
	email: string,
	fullName: string,
	displayName: string,
	password: string,
	familyName: string,
	userId: string
) => {
	// fullname etc needed for database
	try {
		// this will be replaced with POST to api, sending passing email, password, fullName, displayName and familyName
		const userCredential: UserCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		// example of returned object, replace with API response
		return Promise.resolve({
			uid: userCredential.user.uid,
			// placeholder
			fid: '960d1c6b-fc65-484b-99b3-9dc66914bae5'
		});
	} catch (error) {
		console.error(error);
		// temp rejecting until api endpoint is available (ask andy if this doesn't make sense)
		return Promise.reject();
	}
};

export const inviteUser = async (email: string, familyId: string) => {
	// may need to check if user has already been invited(?)
	// POST to /users
	// should create a new user and store the family id + store the user in the families object

	// temporary return
	return Promise.resolve({
		uid: email
	});
};
