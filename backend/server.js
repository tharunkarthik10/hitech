import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Sample health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Hitech API server is running smoothly.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
