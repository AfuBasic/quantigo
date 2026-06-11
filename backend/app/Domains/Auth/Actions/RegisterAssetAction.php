<?php

namespace App\Domains\Auth\Actions;

use App\Models\UploadedAsset;

class RegisterAssetAction
{
    public static function execute(array $data): UploadedAsset
    {
        return UploadedAsset::firstOrCreate(
            ['file_hash' => $data['file_hash']],
            $data
        );
    }
}
