const Book = require('../models/bookModel'); 

exports.list = (req, res) => {
  Book.getAll((err, books) => { 
    if (err) {
      return res.status(500).send('Error al obtener libros');
    }
    res.render('index', { books }); 
  });
};

exports.create = (req, res) => {
  const { titulo, autor, genero, anio_publicacion } = req.body; 
  Book.create(titulo, autor, genero, anio_publicacion, (err) => { 
    if (err) {
      return res.status(500).send('Error al crear libro');
    }
    res.redirect('/'); 
  });
};

exports.update = (req, res) => {
  const { id } = req.params; 
  const { titulo, autor, genero, anio_publicacion } = req.body;
  Book.update(id, titulo, autor, genero, anio_publicacion, (err) => { 
    if (err) {
      return res.status(500).send('Error al actualizar libro');
    }
    res.redirect('/');
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  Book.delete(id, (err) => { 
    if (err) {
      return res.status(500).send('Error al eliminar libro');
    }
    res.redirect('/');
  });
};