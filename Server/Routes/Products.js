const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/"); // Specifica la directory di destinazione dei file caricati
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + file.originalname); // Specifica il nome del file caricato
  },
});
const upload = multer({ storage: storage });

const productRoutes = (db) => {
  // GET: Restituisce tutti i dati
  router.get("/GetAll", (req, res) => {
    db.query(
      "SELECT p.id, p.title, p.description, p.price, s.percentuale, i.path, i.idProdotto FROM prodotto AS p LEFT JOIN immagine AS i ON i.idProdotto = p.id LEFT JOIN sconto AS s ON s.idProdotto = p.id GROUP BY p.id",
      (err, results) => {
        if (err) {
          console.log("Errore nella query del database:", err);
          return res.status(500).json({ message: "Errore del server" });
        }

        res.json(results);
      }
    );
  });

  router.get("/GetAllInEvidence", (req, res) => {
    db.query(
      "SELECT * FROM prodotto AS p INNER JOIN evidenza ON idProdotto = p.id LEFT JOIN immagine AS i ON i.idProdotto = p.id LEFT JOIN sconto AS s ON s.idProdotto = p.id GROUP BY p.id",
      (err, results) => {
        if (err) {
          console.log("Errore nella query del database:", err);
          return res.status(500).json({ message: "Errore del server" });
        }

        res.json(results);
      }
    );
  });

  router.get("/GetAllNotInEvidence", (req, res) => {
    db.query(
      "SELECT p.id, p.title, i.path FROM prodotto AS p LEFT  JOIN immagine AS i ON i.idProdotto = p.id LEFT JOIN evidenza AS e ON e.idProdotto = p.id WHERE e.idProdotto IS NULL GROUP BY p.id",
      (err, results) => {
        if (err) {
          console.log("Errore nella query del database:", err);
          return res.status(500).json({ message: "Errore del server" });
        }

        res.json(results);
      }
    );
  });

  router.get("/GetAllNoDiscount", (req, res) => {
    db.query(
      "SELECT p.id, p.title, i.path FROM prodotto AS p INNER JOIN immagine AS i ON i.idProdotto = p.id INNER JOIN sconto AS e ON e.idProdotto = p.id WHERE percentuale = 0 GROUP BY p.id",
      (err, results) => {
        if (err) {
          console.log("Errore nella query del database:", err);
          return res.status(500).json({ message: "Errore del server" });
        }

        res.json(results);
      }
    );
  });

  router.get("/GetAllPhotoByProduct/:id", (req, res) => {
    const id = parseInt(req.params.id);

    db.query(
      "SELECT * FROM immagine AS i WHERE i.idProdotto = ?",
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

  router.get("/GetProductSearch", (req, res) => {
    const { title } = req.query;

    db.query(
      "SELECT p.id, p.title, p.description, p.price, s.percentuale, i.path, i.idProdotto FROM prodotto AS p LEFT JOIN immagine AS i ON i.idProdotto = p.id INNER JOIN sconto AS s ON s.idProdotto = p.id WHERE p.title LIKE ? GROUP BY p.id",
      [`%${title}%`],
      (err, results) => {
        if (err) {
          console.log("Errore nella query del database:", err);
          return res.status(500).json({ message: "Errore del server" });
        }

        res.json(results);
      }
    );
  });

  // POST: Aggiunge dati al database

  router.post("/AddProduct", upload.any(), (req, res) => {
    const { title, description, price } = req.body;
    const photo = req.files;

    db.query(
      "INSERT INTO prodotto (title, description, price) VALUES (?, ?, ?)",
      [title, description, price],
      (err, productResult) => {
        if (err) {
          console.log("Errore nella query del database:", err);
          return res.status(500).json({ message: "Errore del server" });
        }

        const newProductId = productResult.insertId;

        db.query("INSERT INTO sconto (percentuale, idProdotto) VALUES (?, ?)", [
          0,
          newProductId,
        ]);

        Promise.all(
          photo.map((photo) => {
            return new Promise((resolve, reject) => {
              db.query(
                "INSERT INTO immagine (path, idProdotto) VALUES (?, ?)",
                [photo.filename, newProductId],
                (err, stafferResult) => {
                  if (err) {
                    console.log("Errore nella query del database:", err);
                    reject(err);
                  } else {
                    resolve();
                  }
                }
              );
            });
          })
        )
          .then(() => {
            // All database queries have completed successfully
            return res.status(200).json({ message: "Prodotto aggiunto" });
          })
          .catch((error) => {
            // Handle errors from the database queries
            console.error("Error during database queries:", error);
            return res.status(500).json({ message: "Errore del server" });
          });
      }
    );
  });

  router.post("/AddInEvidence", (req, res) => {
    const { id } = req.body;

    db.query("INSERT INTO evidenza (idProdotto) VALUES (?)", [id], (err) => {
      if (err) {
        console.log("Errore nella query del database:", err);
        return res.status(500).json({ message: "Errore del server" });
      }
      return res.status(200).json({ message: "Prodotto aggiunto in evidenza" });
    });
  });

  router.post("/AddPhoto", upload.single("photo"), (req, res) => {
    const { id } = req.body;
    const photo = req.file;
    db.query(
      "INSERT INTO immagine (path, idProdotto) VALUES (?, ?)",
      [photo.filename, id],
      (err, stafferResult) => {
        if (err) {
          console.log("Errore nella query del database:", err);
          return res.status(500).json({ message: "Errore del server" });
        }
        return res.status(200).json({ message: "Prodotto aggiunto" });
      }
    );
  });

  // PUT: Aggiorna i dati nel database

  router.put("/UpdateDiscount", (req, res) => {
    const { percentuale, idProdotto } = req.body;

    db.query(
      "UPDATE sconto SET percentuale = ? WHERE idProdotto = ?",
      [percentuale, idProdotto],
      (err) => {
        if (err) {
          console.log("Errore nella query del database:", err);
          return res.status(500).json({ message: "Errore del server" });
        }
        return res.status(200).json({ message: "Sconto prodotto applicato" });
      }
    );
  });

  router.put("/UpdateProduct", (req, res) => {
    const { title, description, price, percentuale, id } = req.body;

    db.query(
      "UPDATE prodotto AS p  INNER JOIN sconto AS s ON s.idProdotto = p.id SET p.title = ?, p.description = ?, p.price = ?, s.percentuale = ? WHERE p.id = ?",
      [title, description, price, percentuale, id],
      (err) => {
        if (err) {
          console.log("Errore nella query del database:", err);
          return res.status(500).json({ message: "Errore del server" });
        }
        return res.status(200).json({ message: "Prodotto aggiornato" });
      }
    );
  });

  //Delete: Elimina i dati dal database

  router.delete("/RemoveInEvidence/:id", (req, res) => {
    const id = parseInt(req.params.id);

    db.query("DELETE FROM evidenza WHERE id = ?", [id], (err, results) => {
      if (err) {
        console.log("Errore nella query del database:", err);
        return res.status(500).json({ message: "Errore del server" });
      } else {
        return res
          .status(200)
          .json({ message: "Prodotto rimosso con successo" });
      }
    });
  });

  router.delete("/DeletePhoto/:id&:path", (req, res) => {
    const fs = require("fs");
    const path = require("path");
    const id = parseInt(req.params.id);
    const pathFile = String(req.params.path);

    db.query(
      "DELETE FROM immagine WHERE idProdotto = ? AND path = ?",
      [id, pathFile],
      (err, results) => {
        if (err) {
          console.log("Errore nella query del database:", err);
          return res.status(500).json({ message: "Errore del server" });
        } else {
          // Rimuovi il file dalla cartella uploads
          const fullPath = path.join("public", "uploads", pathFile);
          fs.unlink(fullPath, (err) => {
            if (err) {
              console.log("Errore durante la rimozione del file:", err);
              return res.status(500).json({ message: "Errore del server" });
            } else {
              return res
                .status(200)
                .json({ message: "Prodotto rimosso con successo" });
            }
          });
        }
      }
    );
  });

  return router;
};

module.exports = productRoutes;
