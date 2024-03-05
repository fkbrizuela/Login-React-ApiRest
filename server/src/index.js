const express = require('express');
const mysql = require('mysql');
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "test2"
})

db.connect()

app.post("/nuevo_usuario", (req, res) => {
    const nombre = req.body.nombre;
    const contraseña = req.body.contraseña;
    const confirma_contraseña = req.body.confirma_contraseña;

    if (nombre === null || contraseña === null || confirma_contraseña === null) {
        res.json({ message: "FALLO" });
        return;
    }

    if (nombre.trim().length === 0 || contraseña.trim().length === 0) {
        res.json({ message: "FALLO" });
        return;
    }

    if (contraseña !== confirma_contraseña) {
        res.json({ message: "FALLO" });
        return;
    }

    db.query('INSERT INTO usuario (`nombre`, `contraseña`) VALUES ("?", "?")',[nombre, contraseña], (error, results, fields) => {
        if (results.affectedRows !== 0) {
            res.json({ message: "ok" })
        } else {
            res.json({ message: "FALLO" })
        }
    })
});

app.post("/autenticar", (req, res) => {
    const nombre = req.body.nombre;
    const contraseña = req.body.contraseña;

    if (nombre === null || contraseña === null) {
        res.json({ message: "FALLO" });
        return;
    }

    db.query('SELECT * FROM usuario WHERE nombre="?" AND contraseña="?"',[nombre, contraseña], (error, results, fields) => {
        if (results.length != 0) {
            res.json({ message: "ok" })
        } else {
            res.json({ message: "FALLO" })
        }
    })
});

app.post("/cambio_contrasena", (req, res) => {
    const nombre = req.body.nombre;
    const contraseña_actual = req.body.contraseña_actual;
    const contraseña_nueva = req.body.contraseña_nueva;
    const confirma_contraseña = req.body.confirma_contraseña;

    if (nombre === null || contraseña_actual === null || confirma_contraseña === null) {
        res.json({ message: "FALLO" });
        return;
    }

    if (nombre.trim().length === 0 || contraseña_actual.trim().length === 0) {
        res.json({ message: "FALLO" });
        return;
    }

    if (contraseña_nueva !== confirma_contraseña) {
        res.json({ message: "FALLO" });
        return;
    }

    db.query('SELECT * FROM usuario WHERE nombre="?" AND contraseña="?"',[nombre, contraseña_actual], (error, results, fields) => {
        if (error) {
            res.json(error);
            return;
        }

        if (results.length == 0) {
            res.json({ message: "FALLO" });
            return;
        }

        db.query('UPDATE usuario SET contraseña="?" WHERE nombre="?"',[contraseña_nueva, nombre], (error, results, fields) => {
            if (error) {
                res.json(error);
                return;
            }

            res.json({ message: "ok" })
        });
    });
});

app.listen(3001, ()=>{
    console.log("servidor corriendo en el puerto 3001")
})
