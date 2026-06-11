<?php

namespace App\Domains\Auth\Actions;

use App\Services\CloudinaryService;

class GenerateUploadSignatureAction
{
    public static function execute(string $folder = 'kyb_documents'): array
    {
        $cloudinaryService = new CloudinaryService();
        return $cloudinaryService->generateSignature($folder);
    }
}
