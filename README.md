# RTSP Stream Viewer

A web application that allows users to add RTSP stream URLs and view live streams in a modern, responsive dashboard.

## Features

- Add and manage RTSP streams
- View multiple streams simultaneously in a grid layout
- Real-time video streaming using WebSocket (Django Channels + OpenCV)
- Modern, aesthetic, and user-friendly UI with Material-UI (MUI)
- Basic stream controls (play/pause)
- Responsive design
- Real-time stream updates using WebSocket
- Feedback and error handling with MUI Snackbars/Alerts

## Prerequisites

- Python 3.8+
- Node.js 14+
- FFmpeg
- Redis (for production, optional for local dev)

## Backend Setup

1. Create and activate a virtual environment:
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate  # On Windows
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   pip install opencv-python channels channels-redis daphne requests
   ```

3. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. (Optional) Create a superuser for the admin interface:
   ```bash
   python manage.py createsuperuser
   ```

5. Start the ASGI server with Daphne:
   ```bash
   daphne -b 0.0.0.0 -p 8000 streamviewer.asgi:application
   # Or use the provided run.py script:
   python run.py
   ```

## Frontend Setup

1. Install dependencies (including Material-UI):
   ```bash
   cd frontend
   npm install
   npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
   ```

2. Start the development server:
   ```bash
   npm start
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Add a new stream by entering a name and RTSP URL
3. View your streams in the modern, responsive dashboard
4. Use the video controls to play/pause streams

## API Testing

You can test the API using the provided Python script:

```bash
cd backend
python test_api.py
```

Or use cURL (PowerShell users may need to use the Python script for best results).

## Troubleshooting

- **No video or 0 sec video:**
  - Make sure the RTSP URL is accessible (test in VLC player)
  - Check backend logs for errors (look for 'Failed to open video stream' or frame read errors)
  - Check browser console for WebSocket errors
  - Make sure you are running the backend with Daphne or `python run.py` (not just `runserver`)
  - Ensure all dependencies are installed (OpenCV, channels, daphne, etc.)
- **WebSocket not connecting:**
  - Check that the backend is running with Daphne
  - Check browser console for connection errors
- **Migrations:**
  - If you add or change models, run:
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

## Example RTSP Stream

The application comes with a test RTSP stream:
```
rtsp://admin:admin123@49.248.155.178:555/cam/realmonitor?channel=1&subtype=0
```

## Deployment

### Backend Deployment
1. Set up a production server (e.g., Heroku, DigitalOcean)
2. Configure environment variables
3. Deploy using Daphne or another ASGI server

### Frontend Deployment
1. Build the React application:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the build folder to your preferred hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 