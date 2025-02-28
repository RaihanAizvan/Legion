import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.render('partials/home', { title: 'Welcome to Legion' });
});

export default router;
