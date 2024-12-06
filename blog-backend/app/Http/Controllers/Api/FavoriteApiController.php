<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteApiController extends Controller
{
    public function favorite(Request $request)
{

    try {
        // Validate the request
        $validatedData = $request->validate([
            'post_id' => 'required|exists:posts,id',
            'status' => 'required|in:0,1', // 0: Not Favorite, 1: Favorite
        ]);

        $validatedData['user_id'] = Auth::id();

        // Check if a favorite record exists for this user and post
        $favorite = Favorite::where('user_id', $validatedData['user_id'])->with('post','user')
            ->where('post_id', $validatedData['post_id'])
            ->first();

        if ($favorite) {
            // Update the existing favorite record
            if($favorite->status == 1) {
                $favorite->update(['status' => '0']);
    
                return response()->json([
                    'success' => true,
                    'message' => 'Post unsave correctly ',
                    'data' => $favorite,
                ], 200);
            }
            elseif($favorite->status==0){
                $favorite->update(['status' => '1']);

                return response()->json([
                    'success' => true,
                    'message' => 'Post save correctly ',
                    'data' => $favorite,
                ], 200);

            }
    
        }

        // Create a new favorite record if none exists
        $favorite = Favorite::create($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Favorite status created successfully',
            'data' => $favorite,
        ], 201);
    } catch (\Illuminate\Validation\ValidationException $e) {
        // Validation errors
        return response()->json([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $e->errors(),
        ], 422);
    } catch (\Exception $e) {
        // General errors
        Log::error('Error handling favorite: ' . $e->getMessage());

        return response()->json([
            'success' => false,
            'message' => 'Failed to handle favorite. Please try again later.',
        ], 500);
    }
}

}
