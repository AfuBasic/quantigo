<?php

namespace App\Http\Controllers\Api\V1\Products;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Products\StoreProductRequest;
use App\Http\Requests\Api\V1\Products\UpdateProductRequest;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => []]);
    }

    public function store(StoreProductRequest $request): JsonResponse
    {
        return response()->json(['data' => $request->validated()], 202);
    }

    public function show(string $product): JsonResponse
    {
        return response()->json(['data' => ['id' => $product]]);
    }

    public function update(UpdateProductRequest $request, string $product): JsonResponse
    {
        return response()->json(['data' => ['id' => $product, ...$request->validated()]], 202);
    }

    public function destroy(string $product): JsonResponse
    {
        return response()->json(status: 204);
    }
}
