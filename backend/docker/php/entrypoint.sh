#!/bin/sh
set -e

php artisan optimize:clear
php artisan package:discover --ansi
php artisan migrate --force
php-fpm -D
exec nginx -g "daemon off;"
