<?php

namespace App\Http\Controllers\Api\V1\Notifications;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\V1\Notifications\StoreNotificationRequest;
use App\Http\Requests\Api\V1\Notifications\UpdateNotificationRequest;
use Illuminate\Http\JsonResponse;

class NotificationController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => []]);
    }

    public function store(StoreNotificationRequest $request): JsonResponse
    {
        return response()->json(['data' => $request->validated()], 202);
    }

    public function show(string $notification): JsonResponse
    {
        return response()->json(['data' => ['id' => $notification]]);
    }

    public function update(UpdateNotificationRequest $request, string $notification): JsonResponse
    {
        return response()->json(['data' => ['id' => $notification, ...$request->validated()]], 202);
    }

    public function destroy(string $notification): JsonResponse
    {
        return response()->json(status: 204);
    }
}
