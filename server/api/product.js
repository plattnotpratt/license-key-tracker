// const authenticate = (req, res, next) => {
//   req.user = { id: 'mock-user-id' }; 
//   next();
// };

// router.use(authenticate);

router.get('/', async (req, res) => {
  const products = await prisma.product.findMany({
    where: { ownerId: req.user.id },
    orderBy: { createdAt: 'desc' },
  });
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await prisma.product.findFirst({
    where: { id: req.params.id, ownerId: req.user.id },
  });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

router.post('/', async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        ownerId: req.user.id,
      },
    });

    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const updated = await prisma.product.updateMany({
      where: { id: req.params.id, ownerId: req.user.id },
      data: { name, description, updatedAt: new Date() },
    });

    if (updated.count === 0) {
      return res.status(404).json({ error: 'Product not found or not yours' });
    }

    const product = await prisma.product.findUnique({ where: { id: req.params.id } });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await prisma.product.deleteMany({
      where: { id: req.params.id, ownerId: req.user.id },
    });

    if (deleted.count === 0) {
      return res.status(404).json({ error: 'Product not found or not yours' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});