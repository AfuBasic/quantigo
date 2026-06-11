<?php

namespace App\Services;

use Cloudinary\Cloudinary;
use Cloudinary\Api\ApiUtils;

class CloudinaryService
{
    protected Cloudinary $cloudinary;

    public function __construct()
    {
        $this->cloudinary = new Cloudinary(env('CLOUDINARY_URL'));
    }

    /**
     * Generate signed upload parameters for direct upload from client.
     *
     * @param string $folder
     * @return array
     */
    public function generateSignature(string $folder = 'kyb_documents'): array
    {
        $parsed = parse_url(env('CLOUDINARY_URL'));
        $apiKey = $parsed['user'] ?? '';
        $apiSecret = $parsed['pass'] ?? '';
        $cloudName = $parsed['host'] ?? '';

        $timestamp = time();
        $params = [
            'timestamp' => $timestamp,
            'folder' => $folder,
        ];

        // Sign the parameters using Cloudinary SDK utility
        $signature = ApiUtils::signParameters($params, $apiSecret);

        return [
            'signature' => $signature,
            'timestamp' => $timestamp,
            'api_key' => $apiKey,
            'cloud_name' => $cloudName,
            'folder' => $folder,
        ];
    }
}
