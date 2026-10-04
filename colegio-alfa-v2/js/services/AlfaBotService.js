export class AlfaBotService {
    constructor(rules) {
        this.rules = rules;
        this.defaultResponse = 'Soy AlfaBot ✨ y uso respuestas preparadas. Puedo explicar fracciones, multiplicaciones, cuentos, plantas, colores y valores, o guiarte para subir una tarea. Para otras dudas, consulta a tu profe. ¿Cuál de esos temas practicamos?';
    }

    respond(message) {
        const value = message.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        const rule = this.rules.find(r => r.match.test(value));
        return rule ? rule.response : this.defaultResponse;
    }
}