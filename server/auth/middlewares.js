const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function isLoggedIn(req, res, next){
  if(req.user){
    next();
  }else{
    const error = new Error('Un-Authorized');
    res.status(401);
    next(error);
  }
}

async function isEditable(churchId, userId){
  const result = await prisma.church.findFirst({
    where:{
      id: churchId
    }
  });
  if(result.userId == userId){
    return true;
  }else{
    return false;
  }
}

const generateJWT = (user) => {
  console.log(user);
  const payload = {
      id: user.id,
      displayName: user.displayName,
      email: user.emails[0].value,
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '365d' });
};

const verifyJWT = (req, res, next) => {
  console.log(req.headers.authorization);
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);
  if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
          if (err) {
              return res.status(403).json({ message: 'Invalid token' });
          }
          req.user = decoded;
          const result = await prisma.user.findFirst({
            where:{
                email: decoded.email
            }
        })
        if(result){
          req.user = result;
        }
          next();
      });
  } else {
      res.status(403).json({ message: 'No token provided' });
  }
};

module.exports = {
  isLoggedIn,
  generateJWT,
  verifyJWT,
  isEditable
}