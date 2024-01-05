const express = require("express");
const router = express.Router();

const ecommerceRoutes = (db) => {
  // GET: Restituisce tutti i dati
  router.get("/GetAll", (req, res) => {
    db.query(
      "SELECT p.id, p.title, p.description, p.price, s.percentuale, i.path, i.idProdotto FROM prodotto AS p LEFT JOIN immagine AS i ON i.idProdotto = p.id INNER JOIN sconto AS s ON s.idProdotto = p.id",
      (err, results) => {
        if (err) {
          console.log("Errore nella query del database:", err);
          return res.status(500).json({ message: "Errore del server" });
        }

        res.json(results);
      }
    );
  });

  router.get("/GetAllFilter", (req, res) => {
    const { order, min, max } = req.query;

    let sortOrder = "ASC";
    if (order === "DESC") {
      sortOrder = "DESC";
    }

    const query = `
      SELECT p.id, p.title, p.description, p.price, s.percentuale, i.path, i.idProdotto
      FROM prodotto AS p
      LEFT JOIN immagine AS i ON i.idProdotto = p.id
      LEFT JOIN sconto AS s ON s.idProdotto = p.id
      WHERE p.price BETWEEN ? AND ?
      GROUP BY p.id
      ORDER BY p.price ${sortOrder}
    `;

    db.query(query, [min, max], (err, results) => {
      if (err) {
        console.log("Errore nella query del database:", err);
        return res.status(500).json({ message: "Errore del server" });
      }

      res.json(results);
    });
  });

  router.get("/GetProductById/:id", (req, res) => {
    const { id } = req.params;

    db.query(
      "SELECT p.id, p.title, p.description, p.price, s.percentuale FROM prodotto AS p INNER JOIN sconto AS s ON s.idProdotto = p.id WHERE p.id = ?",
      [id],
      (err, results) => {
        if (err) {
          console.log("Errore nella query del database:", err);
          return res.status(500).json({ message: "Errore del server" });
        }

        res.json(results);
      }
    );
  });

  router.get("/GetAllImagesById/:id", (req, res) => {
    const { id } = req.params;

    db.query(
      "SELECT path FROM immagine WHERE idProdotto = ?",
      [id],
      (err, results) => {
        if (err) {
          console.log("Errore nella query del database:", err);
          return res.status(500).json({ message: "Errore del server" });
        }

        res.json(results);
      }
    );
  });

  router.post("/GetCartItems", (req, res) => {
    const { productIds } = req.body;

    // Verifica se sono stati forniti gli ID dei prodotti
    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ message: "ID dei prodotti non validi" });
    }

    db.query(
      "SELECT p.id, p.title, p.price, s.percentuale, i.path FROM prodotto AS p INNER JOIN sconto AS s ON s.idProdotto = p.id INNER JOIN immagine AS i ON i.idProdotto = p.id WHERE p.id IN (?) GROUP BY p.id",
      [productIds],
      (err, results) => {
        if (err) {
          console.error("Errore nella query del database:", err);
          return res.status(500).json({ message: "Errore del server" });
        }

        res.json(results);
      }
    );
  });

  // POST: Aggiunge dati al database

  router.post("/CheckProductsExistence", (req, res) => {
    const { productIds } = req.body;

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Array di ID prodotto mancante o non valido" });
    }

    db.query(
      "SELECT id FROM prodotto WHERE id IN (?)",
      [productIds],
      (err, results) => {
        if (err) {
          console.log("Errore nella query del database:", err);
          return res.status(500).json({ message: "Errore del server" });
        }

        // Estrai gli ID dei prodotti presenti nel database
        const existingProductIds = results.map((result) => result.id);

        // Crea un array di booleani che indica se ogni ID fornito esiste nel database
        const exists = productIds.map((id) => existingProductIds.includes(id));

        res.json(exists);
      }
    );
  });

  // PUT: Aggiorna i dati nel database

  //Delete: Elimina i dati dal database

  return router;
};

module.exports = ecommerceRoutes;
