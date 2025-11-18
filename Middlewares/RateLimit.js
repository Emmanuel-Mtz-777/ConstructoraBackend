import rateLimit from "express-rate-limit";

export const loginRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuto
    max: 10, // máximo 10 intents por IP
    message: {
        error: "Demasiadas solicitudes, intenta nuevamente en unos minutos."
    },
    standardHeaders: true, // rate limit info en headers
    legacyHeaders: false,
});

export const generalRateLimit = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minuto
    max: 100, // límite general
});
