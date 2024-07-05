import express, { Request, Response } from 'express';
const app = express();
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/product.route';
import { OrderRoutes } from './app/modules/orders/order.route';
import { userRoutes } from './app/modules/users/user.routes';

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/users', userRoutes);


app.get('/', (req:Request, res: Response) => {
  res.send('Order Inventory Management Server is running!')
})

export default app;