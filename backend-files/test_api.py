import requests
import json

def test_create_stream():
    url = "http://127.0.0.1:8000/api/streams/"
    
    # Test data
    data = {
        "name": "test camera",
        "url": "rtsp://admin:admin123@49.248.155.178:555/cam/realmonitor?channel=1&subtype=0",
        "is_active": True
    }
    
    # Print the request data for debugging
    print("Sending request with data:", json.dumps(data, indent=2))
    
    # Make the request
    response = requests.post(url, json=data)
    
    # Print the response
    print("\nResponse status code:", response.status_code)
    print("Response body:", json.dumps(response.json(), indent=2))

if __name__ == "__main__":
    test_create_stream() 