export class TaskController {
    constructor(taskService, getActiveCourseInfo) {
        this.taskService = taskService;
        this.getActiveCourseInfo = getActiveCourseInfo;
        
        this.form = document.querySelector('#upload-form');
        this.status = document.querySelector('#upload-status');
        
        if (this.form) {
            this.form.addEventListener('submit', this.handleUpload.bind(this));
        }
    }

    async handleUpload(event) {
        event.preventDefault();
        const fileInput = document.querySelector('#homework');
        const file = fileInput.files[0];
        const button = event.submitter;

        button.disabled = true;
        this.status.textContent = 'Guardando…';

        try {
            const { courseName, sessionIndex, sessionTitle } = this.getActiveCourseInfo();
            await this.taskService.uploadTask(file, courseName, sessionIndex, sessionTitle);
            this.status.textContent = '¡Listo! Tu tarea está guardada en este navegador. Puedes verla en Mis tareas.';
            fileInput.value = '';
        } catch (error) {
            this.status.textContent = error.message;
        } finally {
            button.disabled = false;
        }
    }
}