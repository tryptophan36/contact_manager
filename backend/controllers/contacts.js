const { db } = require("../connect");

const getContacts = async (req, res) => {

  try {
    const filter =req.query.filter||"name"
    const search = req.query.search||"";
    db.getConnection((err, conn) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        const sql = `SELECT * FROM contacts WHERE ${filter} LIKE '${search}%' order by ${filter}`;
        conn.query(sql, (err, result) => {
          if (err) return res.status(500).send(err);
          res.status(201).send(result);
        });
        conn.release();
      }
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

const postContact = async (req, res) => {
  try {
    
    const { name, email, phone, company, job_title } = req.body;
    if (!name || !phone) {
      return res
        .status(400)
        .json({ message: "Name and phone number are required" });
    }

    db.getConnection((err, conn) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        const sql =
          "INSERT INTO contacts (name, email, phone, company, job_title) VALUES (?, ?, ?, ?, ?)";
        db.query(
          sql,
          [name, email, phone, company, job_title],
          (err, result) => {
            if (err) return res.status(500).send(err);
            res
              .status(201)
              .json({
                id: result.insertId,
                name,
                email,
                phone,
                company,
                job_title,
              });
          }
        );

        conn.release();
      }
    });
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
};

const updateContact = async (req, res) => {
  try {
  } catch (error) {}
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    db.getConnection((err, conn) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        const sql = "DELETE FROM contacts WHERE id =?";
        db.query(sql, [id], (err, result) => {
          if (err) return res.status(500).send(err);
          if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Contact not found" });
          }
      })
          res.status(204).send();
        }})
    
  } catch (error) {}
};



module.exports = { getContacts, postContact, updateContact, deleteContact };
