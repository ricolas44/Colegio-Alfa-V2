export const botRules = [
    { match: /tarea|subir|buzon|archivo/, response: '📬 Entra con alumno / alfa123, elige un curso y busca “Buzón de tareas”. Selecciona un PDF o una imagen y pulsa “Guardar mi tarea”. La verás en Mis tareas. Se guarda aquí, en tu navegador; tu profesor no la recibe.' },
    { match: /contrasena|usuario|entrar|acceso/, response: '🔑 Para probar tu aula usa el usuario alumno y la contraseña alfa123. ¡Después elige tu curso favorito!' },
    { match: /triste|animo|no puedo|dificil|motiva/, response: '🌟 Aprender lleva tiempo. Respira, divide el reto en pasos pequeños y prueba otra vez. Si necesitas compañía, habla con tu profe o un adulto de confianza. ¡Cada intento cuenta!' },
    { match: /fraccion/, response: '🍕 Una fracción representa partes iguales de un todo. Si una pizza tiene 4 porciones iguales y tomas 1, tienes 1/4: un cuarto. ¿Cuántas porciones serían 2/4?' },
    { match: /matemat|multiplic|division/, response: '🔢 Multiplicar es sumar grupos iguales: 4 × 3 = 3 + 3 + 3 + 3 = 12. Dividir es repartir en partes iguales. En Matemática puedes descargar una ficha y practicar un reto.' },
    { match: /comunic|cuento|leer/, response: '📚 Un cuento tiene inicio (conoces a los personajes), nudo (aparece un problema) y desenlace (se resuelve). ¡Inventa uno con un personaje que te guste!' },
    { match: /ciencia|planta|ambiente/, response: '🌱 Las plantas usan luz, agua y dióxido de carbono para fabricar alimento. Sus raíces absorben agua y sus hojas captan la luz. ¡Observa una planta y dibuja sus partes!' },
    { match: /arte|color|dibuj/, response: '🎨 Con pintura, amarillo + azul forma verde. Experimenta y dibuja algo que te haga feliz. En cada curso hay un dibujo SVG que puedes descargar e imprimir desde tu navegador.' },
    { match: /comput|internet|tecnolog/, response: '💻 El teclado te ayuda a escribir y el ratón a seleccionar. Guarda tus contraseñas en privado y pide ayuda a un adulto de confianza si algo en Internet te preocupa.' },
    { match: /personal|valor|respeto|social/, response: '🤝 La empatía es intentar comprender cómo se siente otra persona. Escuchar, respetar turnos y ofrecer ayuda son buenas maneras de practicarla.' },
    { match: /pdf|ficha|descarg/, response: '📂 Abre un curso y busca “Dibujos en Archivos y fichas”. Pulsa “Descargar ficha PDF” para guardarla. Puedes resolverla en tu cuaderno o imprimirla.' },
    { match: /hola|gracias/, response: '¡Hola! 😊 Me alegra acompañarte. Puedo ayudarte con tus cursos, las fichas y el buzón de tareas. ¿Qué quieres explorar?' }
];