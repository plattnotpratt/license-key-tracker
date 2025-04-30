const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200);
  res.json({
    valid: true
  });  
});

module.exports = router;