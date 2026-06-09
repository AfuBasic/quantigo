<?php

namespace App\Http\Controllers\Api\V1\Pools;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Pools\StorePoolRequest;
use App\Http\Requests\Api\V1\Pools\UpdatePoolRequest;
use Illuminate\Http\JsonResponse;

class PoolController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => []]);
    }

    public function store(StorePoolRequest $request): JsonResponse
    {
        return response()->json(['data' => $request->validated()], 202);
    }

    public function show(string $pool): JsonResponse
    {
        return response()->json(['data' => ['id' => $pool]]);
    }

    public function update(UpdatePoolRequest $request, string $pool): JsonResponse
    {
        return response()->json(['data' => ['id' => $pool, ...$request->validated()]], 202);
    }

    public function destroy(string $pool): JsonResponse
    {
        return response()->json(status: 204);
    }
}
