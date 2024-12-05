<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Storage;

class ApiController extends Controller
{
    // Register function (POST,formData)
    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required|confirmed|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/|min:8',
            ]);

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
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
            $request->validate([
                'name' => 'string',
                'email' => 'email|unique:users,email,' . auth()->id(),
                'password' => 'confirmed',
                'bio'=>'string',
                'img' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $user = auth()->user();



            if ($request->hasFile('img')) {
                // Delete the old image if it exists
                if ($user->img) {
                    Storage::delete($user->img);
                }
    
                // Store the new image
                $path = $request->file('img')->store('img');
    
                // Update user's profile image path
                $user->img = $path;
              
            }



            if ($request->filled('name')) {
                $user->name = $request->input('name');
            }
            if ($request->filled('email')) {
                $user->email = $request->input('email');
            }
            if ($request->filled('password')) {
                $user->password = Hash::make($request->input('password'));
            }
            
            if ($request->filled('bio')) {
                $user->bio = $request->input('bio');
            }

            $user->save();

            return response()->json([
                'status' => true,
                'message' => 'Profile updated successfully',
                'data' => $user,
            ]);

        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to update profile',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
