# Light image base with python
FROM python:3.12-slim

# Workdir Creation
WORKDIR /app

# Copy And install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY ./app ./app
COPY ./smartauth.db ./smartauth.db

# Deploy server / Change this if your port is not available
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"] 
