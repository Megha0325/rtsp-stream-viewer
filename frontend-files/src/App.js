import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, TextField, Button, Typography, Card, CardContent, CardHeader, Avatar, Snackbar, Alert, Box } from '@mui/material';
import { Add as AddIcon, Videocam as VideocamIcon } from '@mui/icons-material';
import axios from 'axios';
import StreamViewer from './components/StreamViewer';

const API_BASE_URL = 'http://localhost:8000/api';

function App() {
  const [streams, setStreams] = useState([]);
  const [newStream, setNewStream] = useState({ name: '', url: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/streams/`);
      setStreams(response.data);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error fetching streams', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddStream = async (e) => {
    e.preventDefault();
    if (!newStream.name || !newStream.url) {
      setSnackbar({ open: true, message: 'Please fill in all fields', severity: 'warning' });
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/streams/`, newStream);
      setNewStream({ name: '', url: '' });
      setSnackbar({ open: true, message: 'Stream added!', severity: 'success' });
      fetchStreams();
    } catch (error) {
      setSnackbar({ open: true, message: 'Error adding stream', severity: 'error' });
    }
  };

  const handleInputChange = (e) => {
    setNewStream({
      ...newStream,
      [e.target.name]: e.target.value
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" align="center" gutterBottom fontWeight={700} color="primary.main">
          RTSP Stream Viewer
        </Typography>

        <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 2 }} elevation={3}>
          <form onSubmit={handleAddStream}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Stream Name"
                  name="name"
                  value={newStream.name}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  helperText="e.g. Office Camera"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="RTSP URL"
                  name="url"
                  value={newStream.url}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  helperText="e.g. rtsp://..."
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  size="large"
                  startIcon={<AddIcon />}
                  sx={{ height: '100%' }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <Grid container spacing={3}>
          {streams.length === 0 && !loading && (
            <Grid item xs={12}>
              <Typography align="center" color="text.secondary">
                No streams added yet. Add a stream to get started!
              </Typography>
            </Grid>
          )}
          {streams.map((stream) => (
            <Grid item xs={12} sm={6} key={stream.id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardHeader
                  avatar={<Avatar sx={{ bgcolor: 'primary.main' }}><VideocamIcon /></Avatar>}
                  title={stream.name}
                  subheader={stream.url}
                  titleTypographyProps={{ fontWeight: 600 }}
                  sx={{ pb: 0 }}
                />
                <CardContent>
                  <StreamViewer stream={stream} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default App; 