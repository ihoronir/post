'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {

  res.render('upload', {
    validationErrTitle: req.flash('validationErrTitle')[0]
  });
  
});

module.exports = router;
