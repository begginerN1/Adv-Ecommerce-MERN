require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const categoryRoute = require('./routes/categoryRoute');
const brandRoute = require('./routes/brandRoute');
const coupondRoute = require('./routes/couponRoute');
const orderRouter = require('./routes/orderRouter');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: ['http://localhost:4000', 'https://shovikoapp.vercel.app', 'http://localhost:3000' ],
    credentials: true
}));

// Routes
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/category', categoryRoute);
app.use('/api/brand', brandRoute);
app.use('/api/coupon', coupondRoute);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
    res.send('hi valeri from backend')
});

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log('connected to MOGNODV')
    }
    )
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`server is up at http://localhost:${process.env.PORT}`);
        })
    });

    mongoose.connection.on('error', err => {
    console.log(err);
    // logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErroLog.log');
    });

 app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "intenal server error...";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
