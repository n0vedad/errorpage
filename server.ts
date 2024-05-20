import express, { Request, Response } from 'express';
import { promises as fs } from 'fs';
import path from 'path';

const app = express();

const statusCodes: { [key: number]: string } = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  408: "Request Timeout",
  409: "Conflict",
  413: "Payload Too Large",
  429: "Too Many Requests",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout"
};

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, './public')));

// Route for the home page
app.get('/', async (_: Request, res: Response) => {
  const filePath = path.join(__dirname, './public', 'index.html');
  try {
    const content = await fs.readFile(filePath, 'utf8');
    res.send(content);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Define custom error routes
app.get('/:statusCode', async (req: Request, res: Response) => {
  const statusCode = parseInt(req.params.statusCode, 10);
  if (isNaN(statusCode)) {
    res.status(400).send('Invalid status code');
    return;
  }

  const description = statusCodes[statusCode] || "Unknown Error";
  const filePath = path.join(__dirname, './public', 'custom_error.html');
  console.log(`Attempting to read file: ${filePath}`);

  try {
    let content = await fs.readFile(filePath, 'utf8');
    content = content.replace(/{{HTTP_STATUS_CODE}}/g, statusCode.toString());
    content = content.replace(/{{HTTP_STATUS_DESCRIPTION}}/g, description);

    res.status(statusCode).send(content);
  } catch (err) {
    console.error(`Error reading file: ${err}`);
    res.status(500).send('Internal Server Error');
  }
});

// Catch all other routes and let Express handle them
app.use((_, res) => {
  const filePath = path.join(__dirname, './public', 'index.html');
  res.sendFile(filePath);
});

// Use the PORT environment variable and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
