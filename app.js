const express =require('express');
const cors =require('cors');
const errorHandler = require("./errorHandler");
const authenticationRoutes = require("./routes/authentication") 
const {isUserAuthenticated,isUserAuthorized} = require("./middleware/authentication")
const productsRoutes = require("./routes/products");
const PORT = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authenticationRoutes);
app.use("/api/user/:id/products",isUserAuthenticated,isUserAuthorized,productsRoutes);
app.use(errorHandler);

app.listen(process.env.PORT || PORT, () => {
        console.log(`Server listening on port ${PORT}`)
})