FROM node:24-alpine AS assets

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY resources ./resources
COPY public ./public
COPY vite.config.js ./
RUN npm run build

FROM php:8.4-fpm-bookworm AS runtime

WORKDIR /var/www/html

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git \
        libzip-dev \
        nginx \
        unzip \
    && docker-php-ext-install pdo_mysql zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer

COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --no-interaction --no-progress --no-scripts

COPY . .
COPY --from=assets /app/public/build ./public/build
COPY docker/nginx/default.conf /etc/nginx/sites-available/default
COPY docker/php/entrypoint.sh /usr/local/bin/quantigo-entrypoint

RUN mkdir -p bootstrap/cache \
    && composer dump-autoload --optimize --no-scripts \
    && mkdir -p storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs storage/app/public \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache \
    && chmod +x /usr/local/bin/quantigo-entrypoint

EXPOSE 80

ENTRYPOINT ["quantigo-entrypoint"]
