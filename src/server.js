const fs = require('fs');
const path = require('path');
const express = require('express');
require('./configs/dbConfigs').connectToDb();
const { PORT } = require('./configs/envConfigs');
const { errorHandler } = require('./middlewares/errorMiddlewares');
const cors = require('cors');



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// iterating through routes directory to add all routes
const routesPath = path.join(__dirname, 'routes');
fs.readdirSync(routesPath).forEach(file => {
    app.use('/api', require(`./routes/${file}`));
});
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});