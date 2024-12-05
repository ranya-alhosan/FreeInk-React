<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CommentApiController extends Controller
{
    public function index()
    {
        try {
            $comments = Comment::with(['user', 'post'])->get();

            return response()->json([
                'success' => true,
                'data' => $comments
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching comments: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch comments. Please try again later.',
            ], 500);
        }
    }

    public function storeComment(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'content' => 'required|string',
                'post_id' => 'required|exists:posts,id',
                
            ]);

            $validatedData['user_id'] = Auth::id();

            $comment = Comment::create($validatedData);

            return response()->json([
                'success' => true,
                'data' => $comment
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error creating comment: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to create comment. Please try again later.',
            ], 500);
        }
    }

    public function updateComment(Request $request, $id)
    {
        try {
            $comment = Comment::find($id);

            if (!$comment || $comment->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Comment not found or unauthorized',
                ], 403);
            }

            $validatedData = $request->validate([
                'content' => 'required|string',
            ]);

            $comment->content = $validatedData['content'];
            $comment->save();

            return response()->json([
                'success' => true,
                'data' => $comment
            ]);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error updating comment: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to update comment. Please try again later.',
            ], 500);
        }
    }

    public function deleteComment($id)
    {
        try {
            $comment = Comment::find($id);

            if (!$comment || $comment->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Comment not found or unauthorized',
                ], 403);
            }

            $comment->delete();

            return response()->json([
                'success' => true,
                'message' => 'Comment deleted successfully',
                'data' => $comment
            ]);
        } catch (\Exception $e) {
            Log::error('Error deleting comment: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete comment. Please try again later.',
            ], 500);
        }
    }

}