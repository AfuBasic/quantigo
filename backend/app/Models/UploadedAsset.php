<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UploadedAsset extends Model
{
    use HasFactory;

    protected $fillable = [
        'file_hash',
        'url',
        'file_name',
        'file_size',
        'mime_type',
    ];
}
