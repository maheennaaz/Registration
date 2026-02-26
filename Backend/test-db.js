const db = require('./config/db');

async function testDB() {
    try {
        const [rows] = await db.execute('DESCRIBE users');
        console.log('Users Table Structure:');
        console.table(rows);
        process.exit(0);
    } catch (error) {
        console.error('DB Test Failed:', error);
        process.exit(1);
    }
}

testDB();
