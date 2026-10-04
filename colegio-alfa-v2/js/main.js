// Importar Repositorios (Data Layer)
import { LocalStorageRepository } from './services/LocalStorageRepository.js';

// Importar Servicios (Business Logic Layer)
import { TaskService } from './services/TaskService.js';
import { AlfaBotService } from './services/AlfaBotService.js';

// Importar Controladores de Vista (UI Layer)
import { AppController } from './ui/AppController.js';
import { TaskController } from './ui/TaskController.js';
import { ChatController } from './ui/ChatController.js';

// Importar Reglas (OCP Config)
import { botRules } from './data/botRules.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Instanciar el Repositorio de Almacenamiento (DIP)
    // * Para la Fase 2 en Moodle, esto se reemplazará por: new MoodleApiRepository();
    const storageRepo = new LocalStorageRepository();

    // 2. Instanciar Servicios (SRP)
    const taskService = new TaskService(storageRepo);
    const botService = new AlfaBotService(botRules);

    // 3. Instanciar Controladores de Interfaz Gráfica
    const appController = new AppController(storageRepo);
    
    // TaskController requiere acceso a los datos actuales de sesión del AppController
    const getActiveCourseState = () => appController.getActiveCourseInfo();
    const taskController = new TaskController(taskService, getActiveCourseState);
    
    const chatController = new ChatController(botService);
});