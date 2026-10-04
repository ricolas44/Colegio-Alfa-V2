export class ChatController {
    constructor(botService) {
        this.botService = botService;
        this.chatPanel = document.querySelector('#chat-panel');
        this.chatMessages = document.querySelector('#chat-messages');
        this.chatInput = document.querySelector('#chat-input');
        
        this.initListeners();
        this.addMessage('¡Hola! Soy AlfaBot ✨ Tu compañero de aventuras en 4.º de primaria. Puedo ayudarte con los cursos y mostrarte cómo usar tu aula. ¿Por dónde empezamos?');
    }

    initListeners() {
        document.querySelector('#chat-launcher').onclick = () => this.toggleChat();
        document.querySelector('#close-chat').onclick = () => this.toggleChat(false);
        document.querySelectorAll('[data-chat]').forEach(btn => btn.onclick = () => this.toggleChat(true));
        
        document.querySelector('#chat-form').onsubmit = (e) => {
            e.preventDefault();
            const text = this.chatInput.value.trim();
            if (text) this.sendChat(text);
            this.chatInput.value = '';
        };

        document.querySelectorAll('[data-prompt]').forEach(btn => {
            btn.onclick = () => this.sendChat(btn.dataset.prompt);
        });
    }

    toggleChat(forceState) {
        const isHidden = forceState !== undefined ? !forceState : !this.chatPanel.hidden;
        this.chatPanel.hidden = isHidden;
        document.querySelector('#chat-launcher').setAttribute('aria-expanded', !isHidden);
        if (!isHidden) this.chatInput.focus();
    }

    addMessage(text, isUser = false) {
        const p = document.createElement('p');
        p.className = 'bubble' + (isUser ? ' user' : '');
        p.textContent = text;
        this.chatMessages.append(p);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    sendChat(message) {
        this.addMessage(message, true);
        const response = this.botService.respond(message);
        this.addMessage(response, false);
    }
}