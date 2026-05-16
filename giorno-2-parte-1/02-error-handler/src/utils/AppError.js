// =====================================================
// Classe di errore custom
// =====================================================
// Estende Error standard aggiungendo uno statusCode HTTP.
// I controller la usano cosi':
//
//   throw new AppError('Utente non trovato', 404);
//
// L'error handler centralizzato la cattura e ritorna
// JSON uniforme al client.

export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}
