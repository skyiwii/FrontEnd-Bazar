// ======================================
// DETECTAR RUTA BASE
// ======================================

const rutaBaseBlogs =

    window.location.pathname.includes("/paginas/") ||
    window.location.pathname.includes("/blogs/")
        ? "../media/"
        : "./media/";


// ======================================
// BLOGS
// ======================================

const blogs = [

    {
        id: 1,

        titulo: "Queques de avena y Miel de Ulmo: Dulzura Natural",

        subtitulo:
            "Aprende a preparar una receta saludable usando ingredientes naturales y miel chilena.",

        resumen:
            "Aprende a reemplazar el azúcar refinada con miel natural y prepara una receta suave, nutritiva y perfecta para cualquier momento.",

        categoria: "Recetas",

        categoriaLabel: "RECETAS NATURALES",

        fecha: "12 Mayo 2024",

        lectura: "5 min lectura",

        autor: "Equipo Vura",

        imagen: `${rutaBaseBlogs}queques-miel.jpg`,

        imagenAlt: "Queques de avena preparados con miel natural",

        vistas: "1.250",

        comentariosCount: 24,

        reacciones: {
            love: 120,
            like: 82,
            neutral: 14,
            dislike: 3
        },

        contenido: {

            introduccion: `Cambiar el azúcar refinada por alternativas naturales es el primer paso para una alimentación
                consciente. Hoy te enseñamos a usar nuestra
                <strong>Miel de Ulmo Nativa</strong>
                para darle un toque floral y único a tus queques de avena.`,

            secciones: [
                {
                    tipo: "h3",
                    texto: "Ingredientes necesarios"
                },
                {
                    tipo: "ul",
                    items: [
                        "2 tazas de avena integral",
                        "3 cucharadas de Miel de Ulmo Vura",
                        "2 huevos de campo",
                        "1 cucharadita de polvos de hornear",
                        "Frutos secos a gusto"
                    ]
                },
                {
                    tipo: "h3",
                    texto: "Preparación paso a paso"
                },
                {
                    tipo: "ol",
                    items: [
                        "Mezcla los huevos con la miel hasta obtener una textura homogénea.",
                        "Agrega la avena y los polvos de hornear lentamente.",
                        "Incorpora frutos secos y vierte la mezcla en moldes.",
                        "Hornea durante 20 minutos a 180°C."
                    ]
                },
                {
                    tipo: "blockquote",
                    texto: "La miel de Ulmo no solo endulza, también aporta propiedades antibacterianas naturales."
                }
            ]
        },

        comentarios: [
            {
                id: 1,
                avatar: "C",
                nombre: "Camila",
                tiempo: "Hace 2 días",
                texto: "Me encantó la receta, quedó increíble con nueces.",
                likes: 12,
                dislikes: 1,
                respuestas: [
                    {
                        id: 2,
                        avatar: "A",
                        nombre: "Alfonso",
                        tiempo: "Hace 1 día",
                        texto: "Yo también la hice, quedó muy buena.",
                        likes: 3,
                        dislikes: 0
                    }
                ]
            }
        ],

        anterior: null,

        siguiente: {
            id: 2,
            titulo: "Rutina con Rosa Mosqueta"
        }
    },


    {
        id: 2,

        titulo: "Rutina nocturna: Regenera tu piel con Rosa Mosqueta",

        subtitulo:
            "Descubre cómo incorporar aceite de rosa mosqueta a tu rutina nocturna para nutrir y regenerar tu piel naturalmente.",

        resumen:
            "Descubre una rutina simple para hidratar, regenerar y cuidar tu piel usando ingredientes naturales.",

        categoria: "Cuidado Natural",

        categoriaLabel: "CUIDADO NATURAL",

        fecha: "15 Mayo 2024",

        lectura: "4 min lectura",

        autor: "Equipo Vura",

        imagen: `${rutaBaseBlogs}rosa-mosqueta.jpg`,

        imagenAlt: "Aceite natural de rosa mosqueta",

        vistas: "950",

        comentariosCount: 18,

        reacciones: {
            love: 94,
            like: 51,
            neutral: 7,
            dislike: 1
        },

        contenido: {

            introduccion: `El <strong>Aceite de Rosa Mosqueta</strong> es conocido como uno de los ingredientes naturales
                más efectivos para regenerar la piel. Gracias a su alta concentración de ácidos grasos esenciales
                y antioxidantes, ayuda a mejorar textura, hidratación y luminosidad.`,

            secciones: [
                {
                    tipo: "h3",
                    texto: "Beneficios principales"
                },
                {
                    tipo: "ul",
                    items: [
                        "Estimula la producción natural de colágeno y elastina.",
                        "Ayuda a reducir cicatrices y líneas de expresión.",
                        "Nutre profundamente la piel durante la noche.",
                        "Mejora elasticidad y suavidad."
                    ]
                },
                {
                    tipo: "h3",
                    texto: "Cómo aplicarlo"
                },
                {
                    tipo: "ol",
                    items: [
                        "Lava tu rostro con agua tibia y limpia suavemente la piel.",
                        "Aplica entre 2 y 3 gotas en la palma de tus manos.",
                        "Masajea el rostro con movimientos circulares.",
                        "Déjalo actuar durante toda la noche."
                    ]
                },
                {
                    tipo: "blockquote",
                    texto: "Los mejores resultados aparecen cuando el aceite se utiliza constantemente durante varias semanas."
                }
            ]
        },

        comentarios: [
            {
                id: 1,
                avatar: "J",
                nombre: "Javiera",
                tiempo: "Hace 2 días",
                texto: "Llevo usando rosa mosqueta por semanas y mi piel se siente mucho más hidratada.",
                likes: 8,
                dislikes: 0,
                respuestas: [
                    {
                        id: 2,
                        avatar: "M",
                        nombre: "Martina",
                        tiempo: "Hace 1 día",
                        texto: "A mí también me ayudó bastante con manchas pequeñas.",
                        likes: 2,
                        dislikes: 0
                    }
                ]
            }
        ],

        anterior: {
            id: 1,
            titulo: "Queques de avena y Miel"
        },

        siguiente: {
            id: 3,
            titulo: "3 infusiones para defensas"
        }
    },


    {
        id: 3,

        titulo: "3 Infusiones para fortalecer defensas: Sabiduría del Sur",

        subtitulo:
            "Descubre mezclas naturales de hierbas chilenas que ayudan a fortalecer el organismo durante el invierno y los cambios de estación.",

        resumen:
            "Boldo, poleo y menta: conoce cómo estas hierbas tradicionales pueden acompañar tu bienestar diario.",

        categoria: "Herbolaria",

        categoriaLabel: "HERBOLARIA NATURAL",

        fecha: "20 Mayo 2024",

        lectura: "6 min lectura",

        autor: "Equipo Vura",

        imagen: `${rutaBaseBlogs}tres-infusiones.jpg`,

        imagenAlt: "Infusiones naturales de hierbas chilenas",

        vistas: "800",

        comentariosCount: 18,

        reacciones: {
            love: 102,
            like: 64,
            neutral: 10,
            dislike: 2
        },

        contenido: {

            introduccion: `El invierno y los cambios de estación requieren que nuestro sistema inmune esté en su mejor momento.
                Las <strong>hierbas nativas de Chile</strong> ofrecen una botica natural llena de propiedades
                que ayudan a protegernos de forma preventiva y deliciosa.`,

            secciones: [
                {
                    tipo: "h3",
                    texto: "Hierbas recomendadas"
                },
                {
                    tipo: "ul",
                    items: [
                        "<strong>Boldo:</strong> Excelente para la digestión y la depuración hepática.",
                        "<strong>Poleo:</strong> Con propiedades expectorantes y digestivas.",
                        "<strong>Menta Negra:</strong> Refrescante y útil para aliviar molestias respiratorias leves."
                    ]
                },
                {
                    tipo: "h3",
                    texto: "Preparación correcta"
                },
                {
                    tipo: "ol",
                    items: [
                        "Hierve agua y deja reposar durante un minuto.",
                        "Agrega una cucharadita de hierbas en una taza.",
                        "Vierte el agua caliente y tapa durante 5 a 7 minutos.",
                        "Endulza con miel natural si lo deseas y disfruta lentamente."
                    ]
                },
                {
                    tipo: "blockquote",
                    texto: "Beber una infusión caliente no es solo hidratación; también es un ritual que conecta cuerpo y naturaleza."
                }
            ]
        },

        comentarios: [
            {
                id: 1,
                avatar: "Y",
                nombre: "Yessica",
                tiempo: "Hace 2 días",
                texto: "Muy útil para el invierno, la mezcla con menta quedó excelente.",
                likes: 8,
                dislikes: 0,
                respuestas: [
                    {
                        id: 2,
                        avatar: "L",
                        nombre: "Laura",
                        tiempo: "Hace 1 día",
                        texto: "Yo le agregué miel de ulmo y quedó aún mejor.",
                        likes: 3,
                        dislikes: 0
                    }
                ]
            }
        ],

        anterior: {
            id: 2,
            titulo: "Rutina con Rosa Mosqueta"
        },

        siguiente: null
    }

];