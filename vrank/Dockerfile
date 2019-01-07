ARG PYTHON_VERSION=3.7

# Use an official Python runtime as a parent image
FROM python:${PYTHON_VERSION} AS base
# Set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
# Set the working directory to /app
WORKDIR /code
COPY requirements.txt /code
# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip setuptools wheel
RUN pip install -r requirements.txt

# Build from here for quick updates
# docker-compose up -d --no-deps --build web
FROM base
# Set the working directory to /app
# WORKDIR /code
# Copy the current directory contents into the container at /app
COPY . /code
# Make port 80 available to the world outside this container
EXPOSE 8000
# Define environment variable
# Defined in docker-compose
# ENV NAME World
# Run app.py when the container launches
# CMD ["python", "manage.py runserver"]
ENTRYPOINT ["/code/vrank/entrypoint.sh"]
