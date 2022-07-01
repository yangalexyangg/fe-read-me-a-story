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
	return apiCall.post('/stories', story);
};

export const fetchUserStatus = (email: string) => {
	return Promise.resolve('not found');
};

export const createNewUserAndFamily = async (
	email: string,
	fullName: string,
	displayName: string,
	password: string,
	familyName: string
) => {
	// fullname etc needed for database
	try {
		const userCredential: UserCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		// string will be replaced with object containing uid and fid
		return Promise.resolve('user and family created');
	} catch (error) {
		return Promise.reject('Unable to create account');
	}
};
