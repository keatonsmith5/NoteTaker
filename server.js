const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//make public folder static
app.use(express.static("public"));

//js files
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//listener
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})