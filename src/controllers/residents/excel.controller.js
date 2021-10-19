const db = require("../../models");
const Resident = db.residents;

const readXlsxFile = require("read-excel-file/node");

const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;

    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();

      let residents = [];

      rows.forEach((row) => {
        let resident = {
            id: row[0],
            first_name: row[1],
            last_name: row[2],
            movein_date: row[3],
            lease_term: row[4],
            apartment_number: row[5],
            pets: row[6],
        };

        residents.push(resident);
      });
residents.forEach((row) => {
    Resident.destroy({where: {id: row['id']}})
})
      Resident.bulkCreate(residents)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

const getResidents = (req, res) => {
  Resident.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving residents.",
      });
    });
};

module.exports = {
  upload,
  getResidents,
};