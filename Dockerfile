# Use an official nginx image as the base image
FROM nginx:latest

# Copy the HTML files to the nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80