# Python Base Image
FROM python:3.12-slim

# Set the working directory in the container
WORKDIR /app

# Copy the app.py
COPY . .

# Install Flask
RUN pip install flask

# Expose the port that Flask will run on
EXPOSE 5000

# Run the Flask app
CMD ["python", "app.py"]
