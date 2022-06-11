declare const __DEV__: boolean;

declare module 'idb-file-storage' {
	class IDBFileStorage {
		put(fileName: string, file: Blob | File): Promise<void>;
		get(fileName: string): Promise<Blob | File | undefined>;
		list(): Promise<string>;
	}

	const getFileStorage: (param?: {
		name?: string;
		persistent?: boolean;
	}) => Promise<IDBFileStorage>;

	export { getFileStorage, IDBFileStorage };
}

interface Document {
	addEventListenerNative: Document.addEventListener;
	removeEventListenerNative: Document.removeEventListener;
}

declare namespace NodeJS {
	export interface ProcessEnv {
		MANIFEST_VERSION: '2' | '3';
		NODE_ENV: 'development' | 'production';
	}
}