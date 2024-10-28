import express from "express"
import morgan from "morgan"
import sequelize from "./db/db.js"
import sessions from "express-session";
import cors from "cors";


// import routes
import productRouter from "./routes/products.routes.js"
import usersRouter from "./routes/users.routes.js"
import brandsRouter from "./routes/brands.routes.js"
import categoriesRouter from "./routes/categories.routes.js"
import cartRouter from "./routes/cart.routes.js"
import cartItemRouter from "./routes/cartItem.routes.js"
import orderRouter from "./routes/order.routes.js"
import loginRouter from "./routes/login.routes.js"
import uploadRouter from "./routes/upload.routes.js"

const app = express()
const PORT = 3000

//middlewares
app.use(express.urlencoded({ extended: true }))
app.use("/", express.static("public"))
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(morgan("tiny"))
app.use(express.json())
app.use(sessions({
    secret: "123456",
    saveUninitialized: false,
    cookie: { maxAge: 86400000, httpOnly: true, secure: false },
    resave: false
}));
app.use(express.json())


//sincroniza los modelos con la base de datos
const connection = async () => {
    try {
        await sequelize.sync();
        console.log("Tablas actualizadas correctamente.");
    } catch (error) {
        console.error(`Ocurrió un error al conectarse a la base de datos / ERROR: ${error.message}`);
    }
};

connection()

//server
app.listen(PORT, () => {
    console.log(`Servidor levantado en el puerto: ${PORT}`);
})

//routes
app.use("/products", productRouter)
app.use("/users", usersRouter)
app.use("/brands", brandsRouter)
app.use("/categories", categoriesRouter)
app.use("/cart", cartRouter)
app.use("/cartItem", cartItemRouter)
app.use("/orders", orderRouter)
app.use("/", loginRouter)
app.use("/upload", uploadRouter) 