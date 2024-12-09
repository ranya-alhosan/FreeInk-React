<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Exception;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Support\Facades\Storage;
class ApiController extends Controller
{
    // Register function (POST,formData)

    public function register(Request $request)
    {
        try {
            // Validate input fields
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|confirmed|min:8|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
            ]);

            $defaultImage = asset('storage/users/default-profile.png'); // Make sure the file exists in the storage

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'img' => $defaultImage, // Store the default image URL
            ]);

            return response()->json([
                'status' => true,
                'message' => 'User registered successfully',
                'data' => $user,
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Registration failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Login function (POST,formData)
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            $user = User::where('email', $request->email)->first();

            if ($user && Hash::check($request->password, $user->password)) {
                $token = $user->createToken('MyToken')->plainTextToken;

                return response()->json([
                    'status' => true,
                    'message' => 'Login successfully',
                    'token' => $token,
                    'user' => $user,
                ]);
            }

            return response()->json([
                'status' => false,
                'message' => 'Invalid email or password',
            ], 401);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Login failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Profile function (GET)
    public function profile()
    {
        //return 'test';
        try {
            $data = auth()->user();

            return response()->json([
                'status' => true,
                'data' => $data,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to fetch profile',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Logout function (GET)
    public function logout()
    {
        try {
            auth()->user()->tokens()->delete();

            return response()->json([
                'status' => true,
                'message' => 'Logout successfully',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Logout failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Update Profile function (PUT)
    public function updateProfile(Request $request)
    {
        try {
            // Validate inputs
            $validatedData = $request->validate([
                'name' => 'nullable|string|max:255',
                'email' => 'nullable|email|unique:users,email,' . auth()->id(),
                'password' => 'nullable|confirmed|min:8',
                'bio' => 'nullable|string',
            ]);

            // Get the authenticated user
            $user = auth()->user();

            // Handle image upload and replacement
            if ($request->hasFile('img')) {
                $this->updateUserImage($user, $request->file('img'));
            }

            // Update other fields
            $user->fill(array_filter($validatedData, function ($value) {
                return !is_null($value); // Exclude null values
            }));

            // Hash password if provided
            if ($request->filled('password')) {
                $user->password = Hash::make($request->password);
            }

            // Save the updated user details
            $user->save();

            return response()->json([
                'status' => true,
                'message' => 'Profile updated successfully',
                'data' => $user,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to update profile',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the user's profile image.
     *
     * @param \App\Models\User $user
     * @param \Illuminate\Http\UploadedFile $image
     */
    protected function updateUserImage($user, $image)
    {
        // Delete the old image if it exists and is not the default image
        if ($user->img && !str_contains($user->img, 'default-profile.png')) {
            $oldImagePath = str_replace(asset('storage/'), '', $user->img);
            Storage::disk('public')->delete($oldImagePath);
        }

        // Store the new image and update the user's image path
        $imagePath = $image->store('users', 'public');
        $user->img = asset('storage/' . $imagePath);
    }
}
