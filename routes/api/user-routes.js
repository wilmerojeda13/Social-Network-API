const router = require('express').Router();

const {
    getAllUsers,
    getAllUserById,
    addFriend,
    createUser,
    deleteUser,
    updateUser,
    deleteFriend,
} = require('../../controllers/user-controller');

// Set up GET all and POST routes
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

// Set up GET one, PUT, and DELETE at /:id
router
  .route('/:id')
  .get(getAllUserById)
  .put(updateUser)
  .delete(deleteUser);

// Set up Post and DELETE at /:thoughtId/reactions
router
  .route('/:id/friends/:friendsId')
  .post(addFriend)
  .delete(deleteFriend);


module.exports = router;

