import { StorageRepository } from './StorageRepository.js';

export class LocalStorageRepository extends StorageRepository {
    async getProgress() {
        try {
            return JSON.parse(localStorage.getItem('alfa-session-progress')) || {};
        } catch { return {}; }
    }

    async saveProgress(progressData) {
        localStorage.setItem('alfa-session-progress', JSON.stringify(progressData));
    }

    async _getDb() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('colegio-alfa', 1);
            request.onupgradeneeded = () => request.result.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async saveTask(taskData) {
        const db = await this._getDb();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('tasks', 'readwrite');
            const req = tx.objectStore('tasks').add(taskData);
            tx.oncomplete = () => resolve(req.result);
            tx.onerror = () => reject(tx.error);
        });
    }

    async getTasks() {
        const db = await this._getDb();
        return new Promise((resolve, reject) => {
            const tx = db.transaction('tasks', 'readonly');
            const req = tx.objectStore('tasks').getAll();
            tx.oncomplete = () => resolve(req.result);
            tx.onerror = () => reject(tx.error);
        });
    }
}