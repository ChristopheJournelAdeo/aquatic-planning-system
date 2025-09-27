// Serveur statique simple pour servir les fichiers HTML/CSS/JS
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir les fichiers statiques uniquement
app.use(express.static('public'));

// Route principale - servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Toutes les autres routes renvoient vers index.html (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur statique démarré sur http://localhost:${PORT}`);
    console.log(`📋 Application de planning disponible - Aucune API requise`);
});