const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

// catch all routes
app.use('/', async (req, res) => {
  try {
    // only forward certain headers, skip problematic ones
    const { authorization, 'content-type': contentType } = req.headers;
    const headers = {
      ...(authorization && { authorization }),
      ...(contentType && { 'content-type': contentType }),
      accept: 'application/json',
    };

    const response = await axios({
      method: req.method,
      url: 'https://summary-j2xh.onrender.com' + req.url,
      data: req.body,
      headers
    });

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error('Proxy error:', err.message);
    if (err.response) {
      res.status(err.response.status).json(err.response.data);
    } else {
      res.status(500).json({ message: 'Proxy server error' });
    }
  }
});

const port = 4000;
app.listen(port, () => console.log(`Proxy server running at http://localhost:${port}`));
