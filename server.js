const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const GH_TOKEN = process.env.GITHUB_TOKEN;
const GH_OWNER = process.env.GITHUB_OWNER || 'fernando2496';
const GH_REPO = process.env.GITHUB_REPO || 'Test';

if (!GH_TOKEN) {
  console.error('ERROR: GITHUB_TOKEN environment variable is not set');
  process.exit(1);
}

// Helper: Base64 encode/decode
function b64ToUtf8(b64) {
  const bytes = Uint8Array.from(Buffer.from(b64, 'base64'));
  return Buffer.from(bytes).toString('utf8');
}

function utf8ToB64(str) {
  return Buffer.from(str, 'utf8').toString('base64');
}

// GET endpoint: Fetch ams_data.json from GitHub
app.get('/api/data', async (req, res) => {
  try {
    const url = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/ams_data.json`;
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${GH_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch data from GitHub' });
    }

    const json = await response.json();
    const content = b64ToUtf8(json.content);

    res.json({
      data: JSON.parse(content),
      sha: json.sha,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST endpoint: Save ams_data.json to GitHub
app.post('/api/data', async (req, res) => {
  try {
    const { data, sha } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'Missing data field' });
    }

    const url = `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/ams_data.json`;
    const content = utf8ToB64(JSON.stringify(data, null, 2));

    const body = {
      message: 'AMS Dashboard update',
      content,
      branch: 'main',
    };

    if (sha) {
      body.sha = sha;
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `token ${GH_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('GitHub API error:', error);
      return res.status(response.status).json({ error: 'Failed to save data to GitHub' });
    }

    const result = await response.json();
    res.json({
      sha: result.content?.sha || null,
    });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AMS Dashboard backend running on http://localhost:${PORT}`);
});
