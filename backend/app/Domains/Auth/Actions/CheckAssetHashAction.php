<?php

namespace App\Domains\Auth\Actions;

use App\Models\UploadedAsset;

class CheckAssetHashAction
{
    public static function execute(string $hash): ?UploadedAsset
    {
        return UploadedAsset::where('file_hash', $hash)->first();
    }
}
