const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    addReaction,
    createThought,
    deleteReaction,
    updateThought,
    deleteThought,
} = require('../../controllers/thought-controller');

// Set up GET all and POST routes
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought);

// Set up GET one, PUT, and DELETE at /:id
router
  .route('/:id')
  .get( getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Set up Post and DELETE at /:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .post(addReaction)

// Set up Post and DELETE at /:thoughtId/reactions/: reaction id
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction)

module.exports = router;

