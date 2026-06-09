<?php

namespace App\Http\Controllers\Api\V1\Payments;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Payments\StorePaymentRequest;
use App\Http\Requests\Api\V1\Payments\UpdatePaymentRequest;
use Illuminate\Http\JsonResponse;

class PaymentController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => []]);
    }

    public function store(StorePaymentRequest $request): JsonResponse
    {
        return response()->json(['data' => $request->validated()], 202);
    }

    public function show(string $payment): JsonResponse
    {
        return response()->json(['data' => ['id' => $payment]]);
    }

    public function update(UpdatePaymentRequest $request, string $payment): JsonResponse
    {
        return response()->json(['data' => ['id' => $payment, ...$request->validated()]], 202);
    }

    public function destroy(string $payment): JsonResponse
    {
        return response()->json(status: 204);
    }
}
