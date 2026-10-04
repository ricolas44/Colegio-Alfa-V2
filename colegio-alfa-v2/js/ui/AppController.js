import { courses, courseSessions } from '../data/courses.js';

export class AppController {
    constructor(storageRepo, taskRepo) {
        this.storage = storageRepo;
        this.taskRepo = taskRepo;
        this.activeCourse = null;
        this.activeSessionIndex = 0;
        this.progress = {};
        
        this.init();
    }

    async init() {
        this.progress = await this.storage.getProgress();
        this.initLogin();
        this.initNavigation();
        this.renderCourseGrid();
        this.initClassroomListeners();
        
        try {
            this.showPortal(sessionStorage.getItem('alfa-demo') === 'yes');
        } catch {
            this.showPortal(false);
        }
    }

    initLogin() {
        document.querySelector('#login-form').addEventListener('submit', e => {
            e.preventDefault();
            const user = document.querySelector('#username').value.trim().toLowerCase();
            const pass = document.querySelector('#password').value;
            if (user === 'alumno' && pass === 'alfa123') {
                try { sessionStorage.setItem('alfa-demo', 'yes'); } catch {}
                document.querySelector('#password').value = '';
                document.querySelector('#login-error').textContent = '';
                this.showPortal(true);
            } else {
                document.querySelector('#login-error').textContent = 'Revisa tus datos. Prueba con alumno y alfa123.';
            }
        });

        document.querySelector('#logout').onclick = () => {
            try { sessionStorage.removeItem('alfa-demo'); } catch {}
            this.showPortal(false);
        };
        
        document.querySelector('#toggle-password').onclick = (e) => {
            const input = document.querySelector('#password');
            const visible = input.type === 'password';
            input.type = visible ? 'text' : 'password';
            e.target.textContent = visible ? 'Ocultar' : 'Ver';
        };
    }

    initNavigation() {
        document.querySelectorAll('[data-page]').forEach(btn => {
            btn.onclick = () => {
                const page = btn.dataset.page;
                document.querySelector('#courses-page').hidden = page !== 'courses';
                document.querySelector('#tasks-page').hidden = page !== 'tasks';
                document.querySelectorAll('[data-page]').forEach(b => b.classList.toggle('active', b.dataset.page === page));
                if (page === 'tasks') this.renderTasks();
            };
        });
    }

    showPortal(visible) {
        document.querySelector('#login-view').hidden = visible;
        document.querySelector('#portal-view').hidden = !visible;
        if (visible) document.querySelector('[data-page="courses"]').click();
    }

    renderCourseGrid() {
        const grid = document.querySelector('#course-grid');
        grid.innerHTML = '';
        courses.forEach(course => {
            const card = document.createElement('button');
            card.className = 'course-card';
            card.style.setProperty('--accent', course.color);
            card.style.setProperty('--tint', course.tint);
            card.innerHTML = `
                <div class="course-art" aria-hidden="true">${course.icon}</div>
                <div class="course-content">
                    <small>4.º DE PRIMARIA</small>
                    <h3>${course.name}</h3><p>${course.description}</p>
                    <span>Ver sesiones <b>→</b></span>
                </div>`;
            card.onclick = () => this.openCourse(course);
            grid.append(card);
        });
    }

    openCourse(course) {
        this.activeCourse = course;
        const theme = courseSessions[course.id];
        const dialog = document.querySelector('#course-dialog');
        
        dialog.dataset.theme = course.id;
        dialog.style.setProperty('--course-accent', course.color);
        dialog.style.setProperty('--course-tint', course.tint);
        
        document.querySelector('#course-emblem').textContent = course.icon;
        document.querySelector('#course-title').textContent = course.name;
        
        const nav = document.querySelector('#session-nav');
        nav.innerHTML = '';
        theme.sessions.forEach((session, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.dataset.session = index;
            button.innerHTML = `<span class="session-number">0${index+1}</span><span><small>SESIÓN ${index+1}</small><strong>${session.title}</strong></span><b class="session-check">→</b>`;
            button.onclick = () => this.renderSession(index);
            nav.append(button);
        });

        this.renderSession(0);
        dialog.showModal();
        document.body.classList.add('classroom-open');
    }

    renderSession(index) {
        this.activeSessionIndex = index;
        const session = courseSessions[this.activeCourse.id].sessions[index];
        
        document.querySelector('#session-content').innerHTML = `
            <h3 id="session-title">${session.icon} ${session.title}</h3>
            <p class="lesson-goal">${session.goal}</p>
            <div class="lesson-columns">
                <section class="lesson-explain"><h4>01 · Descubrimos</h4><p>${session.learn}</p><blockquote>${session.example}</blockquote></section>
                <section class="lesson-activity"><h4>02 · Manos a la obra</h4><p>${session.activity}</p></section>
            </div>`;
        
        this.updateSessionProgress();
        
        document.querySelectorAll('[data-session]').forEach(btn => {
            const i = Number(btn.dataset.session);
            btn.classList.toggle('selected', i === index);
        });
    }

    updateSessionProgress() {
        const isComplete = this.progress[`${this.activeCourse.id}:${this.activeSessionIndex}`] === true;
        const btn = document.querySelector('#complete-session');
        btn.textContent = isComplete ? 'Sesión completada ✓' : 'Marcar sesión como completada ✓';
        btn.disabled = isComplete;
    }

    initClassroomListeners() {
        document.querySelector('#close-course').onclick = () => {
            document.querySelector('#course-dialog').close();
            document.body.classList.remove('classroom-open');
        };

        document.querySelector('#complete-session').onclick = async () => {
            this.progress[`${this.activeCourse.id}:${this.activeSessionIndex}`] = true;
            await this.storage.saveProgress(this.progress);
            document.querySelector('#progress-status').textContent = '¡Buen trabajo! Tu avance se guardó.';
            this.updateSessionProgress();
        };

        document.querySelectorAll('[data-aula]').forEach(btn => {
            btn.onclick = () => {
                const section = btn.dataset.aula;
                ['lessons', 'resources', 'homework'].forEach(name => {
                    document.querySelector('#aula-' + name).hidden = name !== section;
                });
            };
        });
    }

    async renderTasks() {
        const list = document.querySelector('#task-list');
        list.textContent = 'Cargando tus tareas…';
        try {
            const tasks = await this.storage.getTasks();
            list.innerHTML = '';
            if (!tasks.length) {
                list.innerHTML = '<p class="empty">📬 Tu buzón está listo. Entra a un curso para guardar tu primera tarea.</p>';
            }
            tasks.reverse().forEach(task => {
                const row = document.createElement('article');
                row.className = 'task-row';
                row.innerHTML = `<div><b>${task.name}</b><small>${task.course} · Sesión ${task.session}</small></div>`;
                const link = document.createElement('a');
                link.textContent = 'Descargar ↓';
                link.href = URL.createObjectURL(task.file);
                link.download = task.name;
                row.append(link);
                list.append(row);
            });
        } catch {
            list.textContent = 'Error al cargar tareas.';
        }
    }

    getActiveCourseInfo() {
        return {
            courseName: this.activeCourse ? this.activeCourse.name : '',
            sessionIndex: this.activeSessionIndex,
            sessionTitle: this.activeCourse ? courseSessions[this.activeCourse.id].sessions[this.activeSessionIndex].title : ''
        };
    }
}