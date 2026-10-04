export const courses = [
  {id:'matematica',name:'Matemática',icon:'📐',color:'#ab6422',tint:'#fff0d9',description:'Números, formas y pequeños retos para grandes ideas.',lesson:'Practica las multiplicaciones y descubre las fracciones.',question:'Si repartes 24 lápices entre 6 amigos, ¿cuántos recibe cada uno?',answers:['3 lápices','4 lápices','6 lápices'],correct:1,explanation:'¡Son 4! Porque 6 × 4 = 24.'},
  {id:'comunicacion',name:'Comunicación',icon:'📚',color:'#bd4c54',tint:'#ffeded',description:'Lee, imagina y dale voz a tus propias historias.',lesson:'Lee un cuento y reconoce el inicio, el nudo y el desenlace.',question:'¿En qué parte de un cuento se resuelve el problema?',answers:['Inicio','Nudo','Desenlace'],correct:2,explanation:'¡En el desenlace! Allí descubrimos cómo termina la historia.'},
  {id:'ciencia',name:'Ciencia y Ambiente',icon:'🌱',color:'#3c8062',tint:'#eaf5e9',description:'Explora la naturaleza y cuida nuestro planeta.',lesson:'Descubre lo que necesitan las plantas para crecer.',question:'¿Qué necesitan las plantas para fabricar su alimento?',answers:['Solo tierra','Luz, agua y dióxido de carbono','Solo oscuridad'],correct:1,explanation:'¡Muy bien! Usan luz, agua y dióxido de carbono en la fotosíntesis.'},
  {id:'arte',name:'Arte y Cultura',icon:'🎨',color:'#9657a0',tint:'#f4ebfb',description:'Dibuja, crea y deja volar tu imaginación.',lesson:'Experimenta con colores y crea una composición original.',question:'Al mezclar pintura amarilla y azul, ¿qué color obtenemos?',answers:['Verde','Rojo','Naranja'],correct:0,explanation:'¡Verde! Prueba con pequeñas cantidades de pintura.'},
  {id:'computacion',name:'Computación e Informática',icon:'💻',color:'#3d78ab',tint:'#eaf3ff',description:'Conoce la tecnología y aprende a crear con ella.',lesson:'Identifica las partes de la computadora y navega con cuidado.',question:'¿Cuál es una buena práctica al usar Internet?',answers:['Compartir tu contraseña','Abrir todos los enlaces','Pedir ayuda a un adulto de confianza'],correct:2,explanation:'¡Correcto! Un adulto de confianza puede acompañarte cuando algo te genera dudas.'},
  {id:'personal',name:'Personal Social y Valores',icon:'🤝',color:'#ae7040',tint:'#fff0e4',description:'Aprende a convivir, compartir y hacer el bien.',lesson:'Practica el respeto, la empatía y el trabajo en equipo.',question:'Si un compañero está triste, ¿qué puedes hacer?',answers:['Escucharlo con respeto','Burlarte','Ignorarlo siempre'],correct:0,explanation:'¡Escucharlo con respeto es una forma de mostrar empatía!'}
];

export const courseSessions = {
  "matematica": {
    "world": "La isla de los números",
    "icon": "🧭",
    "sessions": [
      {
        "title": "El mercado de las sumas",
        "icon": "🛒",
        "goal": "Resuelve compras usando sumas y restas.",
        "learn": "En una suma juntamos cantidades. Para restar, calculamos lo que queda o la diferencia. Alinea unidades con unidades y decenas con decenas.",
        "example": "Si compras un libro de 28 soles y colores de 16 soles, gastas 44 soles. Si pagas con 50, recibes 6 soles.",
        "activity": "Inventa una tienda con tres productos. Anota sus precios, calcula cuánto cuestan juntos y el vuelto de 100 soles.",
        "question": "¿Cuánto es 47 + 25?",
        "answers": ["62", "72", "82"],
        "correct": 1,
        "explanation": "47 + 20 = 67; luego 67 + 5 = 72."
      }
    ]
  }
  // (El resto de la data de sessions del código original iría aquí)
};