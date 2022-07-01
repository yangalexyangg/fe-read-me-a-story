import { writable } from 'svelte/store';

export const recordingIsDisabled = writable(false);
export const stopIsDisabled = writable(false);
export const uploadIsDisabled = writable(false);
export const resetIsDisabled = writable(true);

export const userId = writable('');
export const familyId = writable('');
