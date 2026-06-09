<?php

namespace App\Http\Controllers\Api\V1\Orders;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Orders\StoreOrderRequest;
use App\Http\Requests\Api\V1\Orders\UpdateOrderRequest;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => []]);
    }

    public function store(StoreOrderRequest $request): JsonResponse
    {
        return response()->json(['data' => $request->validated()], 202);
    }

    public function show(string $order): JsonResponse
    {
        return response()->json(['data' => ['id' => $order]]);
    }

    public function update(UpdateOrderRequest $request, string $order): JsonResponse
    {
        return response()->json(['data' => ['id' => $order, ...$request->validated()]], 202);
    }

    public function destroy(string $order): JsonResponse
    {
        return response()->json(status: 204);
    }
}
