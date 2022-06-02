import {ref, StorageReference, uploadBytes} from 'firebase/storage';
import {storage} from '../firebase.config';

export const createRef = (refName: string) => ref(storage, refName);

export const uploadFile = (ref: StorageReference, file: File): Promise<any> => uploadBytes(ref, file);
