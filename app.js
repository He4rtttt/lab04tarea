const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');

// Middleware para procesar JSON
app.use(express.json());

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));

// Datos de ejemplo
let clientes = [
    { id: 1, nombre: 'Kevin', edad: 25 },
    { id: 2, nombre: 'Ana', edad: 30 },
    { id: 3, nombre: 'Juan', edad: 28 },
    { id: 4, nombre: 'María', edad: 35 }
];

let productos = [
    { id: 1, nombre: 'Galletas', precio: 10 },
    { id: 2, nombre: 'Jugo de Naranja', precio: 15 },
    { id: 3, nombre: 'Café', precio: 8 },
    { id: 4, nombre: 'Té', precio: 5 }
];

// Ruta principal
app.get('/', (req, res) => {
    res.render('index', { title: 'Bienvenido', message: 'Bienvenido a la API de Express' });
});

// Ruta para mostrar clientes
app.get('/clientes', (req, res) => {
    res.render('clientes', { title: 'Clientes', clientes: clientes });
});

// Ruta para mostrar productos
app.get('/productos', (req, res) => {
    res.render('productos', { title: 'Productos', productos: productos });
});

// Crear nuevo cliente
app.post('/clientes', (req, res) => {
    const nuevoCliente = { id: clientes.length + 1, nombre: req.body.nombre, edad: req.body.edad };
    clientes.push(nuevoCliente);
    res.status(201).json(nuevoCliente);
});

// Actualizar cliente
app.put('/clientes/:id', (req, res) => {
    const clienteId = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === clienteId);
    if (cliente) {
        cliente.nombre = req.body.nombre;
        cliente.edad = req.body.edad;
        res.json(cliente);
    } else {
        res.status(404).send('Cliente no encontrado');
    }
});

// Eliminar cliente
app.delete('/clientes/:id', (req, res) => {
    const clienteId = parseInt(req.params.id);
    clientes = clientes.filter(c => c.id !== clienteId);
    res.status(204).send();
});

// Crear nuevo producto
app.post('/productos', (req, res) => {
    const nuevoProducto = { id: productos.length + 1, nombre: req.body.nombre, precio: req.body.precio };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Actualizar producto
app.put('/productos/:id', (req, res) => {
    const productoId = parseInt(req.params.id);
    const producto = productos.find(p => p.id === productoId);
    if (producto) {
        producto.nombre = req.body.nombre;
        producto.precio = req.body.precio;
        res.json(producto);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});

// Eliminar producto
app.delete('/productos/:id', (req, res) => {
    const productoId = parseInt(req.params.id);
    productos = productos.filter(p => p.id !== productoId);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
