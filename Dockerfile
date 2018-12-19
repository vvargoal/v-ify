# Use an official Python runtime as a parent image
FROM python:3.7

# Set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory to /app
WORKDIR /code

# Copy the current directory contents into the container at /app
COPY . /code

# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip setuptools wheel
RUN pip install -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 8000

# Define environment variable
# ENV NAME World

# Run app.py when the container launches
# CMD ["python", "manage.py runserver"]
ENTRYPOINT ["/code/vrank/entrypoint.sh"]
