
// CORS configuration
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://feedback-form-umber-gamma.vercel.app",
        "https://madhu74188.github.io"
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));
