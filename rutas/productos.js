// Laura Daniela Aponte Beltrán
// Jhonattan Fernando Aponte Gamboa

const express = require('express');
const router = express.Router();

const data = [
  {id: 1, nombre: 'Zapatos A', valor: 19.3, enStock: true, createdOn: new Date()},
  {id: 2, nombre: 'Zapatos B', valor: 206.3, enStock: false, createdOn: new Date()},
  {id: 3, nombre: 'Zapatos C', valor: 56.0, enStock: true, createdOn: new Date()},
  {id: 4, nombre: 'Zapatos D', valor: 63.8, enStock: true, createdOn: new Date()},
  {id: 5, nombre: 'Zapatos E', valor: 39.4, enStock: false, createdOn: new Date()},
];

// Se manda la lista de productos con el método GET con 202 como código de estado y el JSON de los productos
router.get('/', function (req, res) {
  res.status(200).json(data);
});

// Se manda un producto específico por ID con el método GET con 202 como código de estado y el JSON del producto
router.get('/:id', function (req, res) {
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    res.status(200).json(found);
  } else {
    res.sendStatus(404);
  }
});

// Se crea un nuevo producto con el método POST con 201 como código de estado y el JSON del producto creado
router.post('/', function (req, res) {
  let itemIds = data.map(item => item.id);
  let orderNums = data.map(item => item.order);

  let newItem = {
    id: itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1,
    nombre: req.body.nombre,
    valor: req.body.valor,
    enStock: false,
    createdOn: new Date()
  };

  data.push(newItem);

  res.status(201).json(newItem);
});

// Se actualiza un producto por ID con el método PUT con 204 como código de estado y el JSON del producto actualizado
// si no se encuentra el producto se manda un 404
router.put('/:id', function (req, res) {
  const found = data.find(item => item.id === parseInt(req.params.id));

  if (found) {
    found.nombre = req.body.nombre;
    found.valor = req.body.valor;
    found.enStock = req.body.enStock;

    res.status(204).json(found);
  } else {
    res.sendStatus(404);
  }
});


// Se elimina un producto por ID con el método DELETE con 204 como código de estado
// si no se encuentra el producto se manda un 404
router.delete('/:id', function (req, res) {
  let found = data.find(function (item) {
    return item.id === parseInt(req.params.id);
  });

  if (found) {
    let targetIndex = data.indexOf(found);

    data.splice(targetIndex, 1);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
