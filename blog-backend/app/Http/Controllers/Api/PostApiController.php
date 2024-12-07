<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PostApiController extends Controller
{
    // Get all posts
    public function index()
    {
        try {
            $posts = Post::with(['user', 'category', 'comment'])
            ->withCount([
                'comment',
                'like as likes_count' => function ($query) {
                    $query->where('status', 'like');
                },
                'like as dislikes_count' => function ($query) {
                    $query->where('status', 'dislike');
                },
            ])
            ->orderBy('created_at', 'desc') // Order by the latest posts
            ->get();
        
    
            return response()->json([
                'success' => true,
                'data' => $posts,
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error fetching posts: ' . $e->getMessage());
    
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve posts. Please try again later.',
            ], 500);
        }
    }
    
    // Create a new post
    public function storePost(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'category_id' => 'required|exists:categories,id',
                'img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $imagePath = null;
            if ($request->hasFile('img')) {
                // Store the uploaded image in the 'public/posts' directory
                $imagePath = $request->file('img')->store('posts', 'public');
            }

            $post = Post::create([
                'title' => $validatedData['title'],
                'content' => $validatedData['content'],
                'img' => $imagePath ? asset('storage/' . $imagePath) : null, // Save the image path
                'user_id' => Auth::id(),
                'category_id' => $validatedData['category_id'],
            ]);

            return response()->json([
                'success' => true,
                'data' => $post,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error creating post: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to create post. Please try again later.',
            ], 500);
        }
    }


    // Update an existing post
    public function updatePost(Request $request, $id)
    {
        try {
            $post = Post::find($id);

            if (!$post || $post->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Post not found or unauthorized',
                ], 403);
            }

            $validatedData = $request->validate([
                'title' => 'nullable|string|max:255',
                'content' => 'nullable|string',
                'img' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'category_id' => 'nullable|exists:categories,id',
            ]);

            if ($request->hasFile('img')) {
                // Delete the old image if it exists
                if ($post->img) {
                    Storage::disk('public')->delete($post->img);
                }

                // Store the new image
                $imagePath = $request->file('img')->store('posts', 'public');
                $post->img = $imagePath; // Update the image path
            }

            // Update the other fields
            $post->update(array_filter($validatedData));

            return response()->json([
                'success' => true,
                'data' => $post,
            ], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error updating post: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to update post. Please try again later.',
            ], 500);
        }
    }


    // Delete a post
    public function deletePost($id)
    {
        try {
            $post = Post::find($id);

            if (!$post || $post->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Post not found or unauthorized',
                ], 403);
            }

            $post->delete();

            return response()->json([
                'success' => true,
                'message' => 'Post deleted successfully',
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error deleting post: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete post. Please try again later.',
            ], 500);
        }
    }
}
