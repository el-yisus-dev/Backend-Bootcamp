const { Router } = require("express");

const { getAllUsers, createUser, getUserById, updateUser, deleteUser } = require("../controllers/users");


const router = Router();

router
    .get("/", getAllUsers)
    .post("/", createUser)
    .get("/:id", getUserById)
    .patch("/:id", updateUser)
    .delete("/:id", deleteUser)


module.exports = router;