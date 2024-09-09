const Financial = require("../models/financial.model");

// Create a new Financial record
exports.create = async (req, res) => {
  const { userId, description, date, amount, category, paymentMethod } =
    req.body;

  const newRecord = {
    userId,
    description,
    date,
    amount,
    category,
    paymentMethod,
  };

  try {
    const data = await Financial.create(newRecord);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occurred while saving the financial record.",
    });
  }
};


//Retreiev all financial record
exports.findAll = async (req, res) => {
  await Financial.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.massage ||
          "Error",
      });
    });
};

//Retreive all financial records by User Id
exports.findAllByUserId = async (req, res) => {
  const userId = req.params.userId;
  await Financial.findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message: error.massage || "Some error occured while retrieving the financial record",  
      });
    })
};

//Update a financial record
exports.update = async (req, res) => {
  const id = req.params.id;
  await Financial.update(req.body, {
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Financial was update successfully" });
      } else {
        res.send({
          message:
            "Cannot update financial with id" +
            id +
            ". Maybe financial was not found or res.body is empty!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.massage ||
          "Somthing error occured while updatef the financial.",
      });
    });
};

//Delete a financial record
exports.delete = async (req, res) => {
  const id = req.params.id;
  await Financial.destroy({
    where: {
      id: id,
    },
  })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Delete successfully" });
      } else {
        res.send({
          message: "Cannot Delete" + id + ".",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.massage ||
          "Somthing error occured while creating the financial.",
      });
    });
};

