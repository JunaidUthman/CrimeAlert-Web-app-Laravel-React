# Use an official PHP image with necessary extensions
FROM php:8.2-fpm

# Set working directory inside the container
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip git curl

# Install PHP extensions needed for Laravel
RUN docker-php-ext-install pdo_mysql zip

# Install Composer (PHP dependency manager)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy Laravel code into container
COPY . .

# Install PHP dependencies
RUN composer install

# Expose port 9000 for PHP-FPM
EXPOSE 9000

# Command to run Laravel
CMD ["php-fpm"]
