const { Router } = require("express");

const { getAllUsers, createUser, getUserById, updateUser, deleteUser } = require("../controllers/users");


const router = Router();

router
    .get("/", getAllUsers)
    .post("/", createUser);

//Another way to handle the routes
router
    .route("/:id")
    .get(getUserById)
    .patch(updateUser)
    .delete(deleteUser)


module.exports = router;