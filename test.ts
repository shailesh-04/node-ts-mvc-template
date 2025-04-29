import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.get('/*splat', (req: Request, res: Response) => {
  res.send(req.url);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
