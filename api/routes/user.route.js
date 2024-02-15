import express from 'express';
const router = express.Router();

// POST /users
router.post('/', (req, res) => {
    // Get the user data from the request body
    const { name, email } = req.body;

    // Create a new user object
    const user = {
        name,
        email
    };

    // Send the user object as JSON response
    res.json(user);
});
// GET /users
router.get('/', (req, res) => {
    res.json({message:"test"});
});

// PUT /users/:id
router.put('/:id', (req, res) => {
    // Logic for updating a user
});


export default router;
