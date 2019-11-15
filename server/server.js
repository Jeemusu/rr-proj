const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '../', 'public');
const port = process.env.PORT || 3000 ; // get servers env variable for PORT

app.use(express.static(publicPath));

// Fallback to index.html
app.get('*', (request, response) => {
    response.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('server up');
});