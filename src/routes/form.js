const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const formController = require('../controllers/form');

router.post(
  '/post',
  [
    body('nim').isLength({ min: 5 }).withMessage('Title tidak sesuai'),
    body('nama_depan').isLength({ min: 1 }).withMessage('body tidak sesuai'),
    body('nama_belakang').isLength({ min: 1 }).withMessage('body tidak sesuai'),
    body('email_1').isLength({ min: 3 }).withMessage('body tidak sesuai'),
    body('email_2').isLength({ min: 3 }).withMessage('body tidak sesuai'),
    body('password').isLength({ min: 6 }).withMessage('body tidak sesuai'),
    body('no_hp').isLength({ min: 10 }).withMessage('body tidak sesuai'),
  ],
  formController.createFormPost,
);

router.get('/posts', formController.getAllFormPost);
router.get('/posts/request', formController.getFormPostByRequest);
router.get('/post/:postId', formController.getFormPostById);
router.put(
  '/post/:postId',
  [
    body('setuju').isLength({ min: 3 }).withMessage('tidak sesuai'),
    body('pesan').isLength({ min: 3 }).withMessage('pesan tidak sesuai'),
  ],
  formController.updateFormPost,
);
router.delete('/post/:postId',formController.deleteFormPost)

module.exports = router;
