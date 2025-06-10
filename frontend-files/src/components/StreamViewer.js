import React, { useEffect, useRef, useState } from 'react';

const StreamViewer = ({ stream }) => {
    const videoRef = useRef(null);
    const wsRef = useRef(null);
    const [error, setError] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!stream) return;

        setError(null);
        setIsConnected(false);
        // Connect to WebSocket
        const ws = new WebSocket(`ws://localhost:8000/ws/stream/${stream.id}/`);
        wsRef.current = ws;

        ws.onopen = () => {
            setIsConnected(true);
            setError(null);
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'stream_frame') {
                    if (videoRef.current) {
                        videoRef.current.src = `data:image/jpeg;base64,${data.frame}`;
                    }
                }
                if (data.type === 'error') {
                    setError(data.message || 'Stream error');
                }
            } catch (err) {
                setError('Error processing stream data');
            }
        };

        ws.onerror = (error) => {
            setError('WebSocket error: Could not connect to stream');
            setIsConnected(false);
        };

        ws.onclose = () => {
            setIsConnected(false);
        };

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [stream]);

    if (!stream) return null;

    return (
        <div className="stream-viewer">
            <h3>{stream.name}</h3>
            {error && <div className="error-message" style={{color: 'red', marginBottom: 8}}>{error}</div>}
            {!isConnected && !error && <div>Connecting to stream...</div>}
            <img
                ref={videoRef}
                alt={stream.name}
                style={{ 
                    width: '100%', 
                    maxWidth: '640px',
                    border: isConnected ? '2px solid green' : '2px solid red',
                    borderRadius: 8,
                    background: '#eee',
                    minHeight: 200
                }}
            />
        </div>
    );
};

export default StreamViewer; 