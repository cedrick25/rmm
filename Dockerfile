# Use a base image with PHP and Apache
FROM php:7.4-apache

# Set the working directory
WORKDIR /var/www/html

# Copy your CodeIgniter files into the container
COPY . .

# Expose the port Apache will run on
EXPOSE 80

# Start Apache
CMD ["apache2-foreground"]