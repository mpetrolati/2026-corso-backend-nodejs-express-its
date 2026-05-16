// =====================================================
// asyncHandler: wrapper per controller async
// =====================================================
// Express (fino alla 4.x) non cattura automaticamente le
// promise rifiutate dentro a un controller async. Senza
// questo wrapper, dovremmo scrivere try/catch in ogni
// controller. Cosi' invece basta wrappare la funzione:
//
//   router.get('/:id', asyncHandler(async (req, res) => {
//     const user = await repo.findById(req.params.id);
//     if (!user) throw new AppError('Non trovato', 404);
//     res.json(user);
//   }));

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
