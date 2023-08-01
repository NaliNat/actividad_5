const express = require("express");
const router = express.Router();
const Libro = require("../models/Libro");

router.get("/", async (req, res, next) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);

    res.json(libro);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el libro", err });
  }
});

router.post("/", async (req, res) => {
  try {
    const libroNuevo = new Libro(req.body);
    await libroNuevo.save();
    res.json(libroNuevo);
  } catch (err) {
    res.status(500).json({ error: "Error al crear el libro", err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const libro = await Libro.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!libro) {
      const error = new Error();
      error.status = 404;
      throw error;
    }

    res.json(libro);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar el libro", err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const libroEliminado = await Libro.findByIdAndDelete(req.params.id);

    if (!libroEliminado) {
      const error = new Error();
      error.status = 404;
      throw error;
    }
    res.json(libroEliminado);
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar el libro", err });
  }
});

module.exports = router;
