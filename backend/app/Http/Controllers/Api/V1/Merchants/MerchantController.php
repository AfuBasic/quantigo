<?php

namespace App\Http\Controllers\Api\V1\Merchants;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Merchants\StoreMerchantRequest;
use App\Http\Requests\Api\V1\Merchants\UpdateMerchantRequest;
use Illuminate\Http\JsonResponse;

class MerchantController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => []]);
    }

    public function store(StoreMerchantRequest $request): JsonResponse
    {
        return response()->json(['data' => $request->validated()], 202);
    }

    public function show(string $merchant): JsonResponse
    {
        return response()->json(['data' => ['id' => $merchant]]);
    }

    public function update(UpdateMerchantRequest $request, string $merchant): JsonResponse
    {
        return response()->json(['data' => ['id' => $merchant, ...$request->validated()]], 202);
    }

    public function destroy(string $merchant): JsonResponse
    {
        return response()->json(status: 204);
    }
}
