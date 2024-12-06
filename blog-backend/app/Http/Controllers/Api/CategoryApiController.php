<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CategoryApiController extends Controller
{
    public function index()
{
    try {
        $categories = Category::all();
        return response()->json($categories, 200); // HTTP 200 OK
    } catch (\Exception $e) {
        // Log the error for debugging purposes
        Log::error('Error fetching categories: ' . $e->getMessage());

        // Return an error response
        return response()->json([
            'error' => 'Failed to fetch categories',
            'message' => $e->getMessage(),
        ], 500); // HTTP 500 Internal Server Error
    }
}

}
