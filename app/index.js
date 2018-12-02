const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
    host: 'redis.localhost'
});

client.set('visits', 0);

app.get('/', (req, res) => {
    client.get('visits', (err, visits) => {
        res.send('Number of visits: ' + visits);

        client.set('visits', parseInt(visits) + 1);
    });
});

app.get('/users', (req, res) => {
    const html = '<ul><li>User 1-2</li><li>User 2</li></ul>';

    res.send(html);
});


app.listen(8200, () => {
    console.log('Listening on port 8200');
});