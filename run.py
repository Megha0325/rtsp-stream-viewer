import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'streamviewer.settings')
django.setup()

from streamviewer.asgi import application

if __name__ == "__main__":
    from daphne.server import Server
    Server(application).run(host='0.0.0.0', port=8000) 