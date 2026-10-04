export class TaskService {
    constructor(repository) {
        this.repository = repository;
    }

    async uploadTask(file, courseName, sessionIndex, sessionTitle) {
        if (!file) throw new Error('Selecciona un archivo.');
        if (!/\.(pdf|png|jpe?g)$/i.test(file.name) || file.size > 5 * 1024 * 1024 || file.size === 0) {
            throw new Error('Elige un PDF, PNG o JPG con contenido y de hasta 5 MB.');
        }

        const taskData = {
            course: courseName,
            session: sessionIndex + 1,
            sessionTitle: sessionTitle,
            name: file.name,
            file: file,
            date: new Date().toISOString()
        };

        return await this.repository.saveTask(taskData);
    }
}