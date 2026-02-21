require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 Test de connexion MongoDB...\n');

console.log('Configuration:');
console.log('- URI:', process.env.MONGODB_URI);
console.log('- Port:', process.env.PORT);
console.log('\nTentative de connexion...\n');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('✅ Connexion à MongoDB réussie!');
        console.log('📊 Base de données:', mongoose.connection.name);
        console.log('🌐 Host:', mongoose.connection.host);
        console.log('\n🎉 Tout fonctionne correctement!\n');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ Erreur de connexion à MongoDB:');
        console.error('Message:', err.message);
        console.error('\n💡 Solutions possibles:');
        console.error('1. Vérifiez que MongoDB est démarré (mongod)');
        console.error('2. Vérifiez l\'URI dans le fichier .env');
        console.error('3. Si vous utilisez Atlas, vérifiez votre connexion Internet');
        console.error('4. Consultez MONGODB_GUIDE.md pour plus d\'aide\n');
        process.exit(1);
    });
