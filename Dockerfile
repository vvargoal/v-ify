ARG PYTHON_VERSION=3.7
ARG NODE_VERSION=11.9

# Use an official Python runtime as a parent image
FROM python:${PYTHON_VERSION} AS python-base
# Set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
# Set the working directory to /app
WORKDIR /usr/src/app
COPY app/requirements.txt /usr/src/app
# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip setuptools wheel
RUN pip install -r requirements.txt

# Build the bundle.js to be copied into final image
FROM node:${NODE_VERSION} AS node-base
WORKDIR /usr/src/node
# TODO file doesn't exist in build context...
COPY package.json /usr/src/node/package.json
RUN npm install
COPY webpack.config.js /usr/src/node
COPY js/ /usr/src/node/js/
RUN ./node_modules/.bin/webpack

# Build from here for quick updates
FROM python-base
# Set the working directory to /app
WORKDIR /usr/src/app
# Copy js bundle from previous stage
COPY --from=node-base /usr/src/node/app/static/js /usr/src/app/static/js 
# Copy the current directory contents into the container at /app
COPY app/ /usr/src/app/
# Make port 80 available to the world outside this container
EXPOSE 8000
# Define environment variable
# Environment variables defined in docker-compose
# Run app.py when the container launches
# CMD ["python", "manage.py runserver"]
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
