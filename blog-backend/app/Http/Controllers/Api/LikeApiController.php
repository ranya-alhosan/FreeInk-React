<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LikeApiController extends Controller
{
  
    public function like(Request $request)
    {
        $validatedData = $request->validate([
            'post_id' => 'required|exists:posts,id', // Ensure post_id exists in the posts table
            'status' => 'required|in:like,dislike', // Validate that status is either 'like' or 'dislike'
        ]);
    
        $userId = Auth::id();
    
        // Find an existing like/dislike for this user and post
        $like = Like::where('user_id', $userId)
            ->where('post_id', $validatedData['post_id'])
            ->first();
    
        if ($like) {
            // If the status is the same as the existing one, reset to 'none'
            if ($like->status === $validatedData['status']) {
                $like->update(['status' => 'none']);
    
                return response()->json([
                    'success' => true,
                    'message' => 'Post status reset to none',
                ], 200);
            }
    
            // Otherwise, update the status to the new one (toggle between like and dislike)
            $like->update(['status' => $validatedData['status']]);
    
            return response()->json([
                'success' => true,
                'message' => "Post status updated to {$validatedData['status']}",
                'data' => $like,
            ], 200);
        }
    
        // If no record exists, create a new like/dislike
        $like = Like::create([
            'user_id' => $userId,
            'post_id' => $validatedData['post_id'],
            'status' => $validatedData['status'],
        ]);
    
        return response()->json([
            'success' => true,
            'message' => "Post status set to {$validatedData['status']}",
            'data' => $like,
        ], 201);
    }

    function index(){
        try {
            $likes = Like::with(['user', 'post'])->get();
        
            return response()->json([
                'success' => true,
                'data' => $likes,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error fetching likes: ' . $e->getMessage());
    }
    

}
}