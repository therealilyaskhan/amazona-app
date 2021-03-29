/* 
When you have 'type: module' in the package.json file, your source code should use import syntax. When you do not have, you should use require syntax. you can't mix up both require and import calls while importing modules, that will give an error;
*/
import express from 'express';
const app = express();
const port = process.env.PORT || 5000;
import data from './data.js';

app.get('/api/products/:id', (req, res) => {
  const product = data.find(x => x._id === req.params.id);
  if (product)
    res.json(product);
  else
    res.status(404).send({ message: "Product not Found!" });
});

app.get('/api/products', (req, res) => {
  res.json(data);
});


app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`server at https://localhost:${port}`));