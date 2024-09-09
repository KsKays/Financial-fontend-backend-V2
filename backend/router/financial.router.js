const financialController = require("../controller/financial.controller");
const express = require("express");
const router = express.Router();

//create http://localhost:5000/api/v1/financial/
router.post("/", financialController.create);

//getAll http://localhost:5000/api/v1/financial/
router.get("/", financialController.findAll);

//getById http://localhost:5000/api/v1/financial/user/userId
router.get("/user/:userId", financialController.findAllByUserId);

//update http://localhost:5000/api/v1/financial/userId
router.put("/:id", financialController.update);

//delete http://localhost:5000/api/v1/financial/userId
router.delete("/:id", financialController.delete);

module.exports = router;
