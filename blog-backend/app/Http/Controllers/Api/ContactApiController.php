<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactApiController extends Controller
{
    public function contact(Request $request)
{
    try {
        // Validate the request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        // Create a new Contact record
        $contact = new Contact($validatedData);
        $contact->save();

        return response()->json([
            'success' => true,
            'message' => 'Contact created successfully',
            'data' => $contact,
        ], 201);

    } catch (\Illuminate\Validation\ValidationException $e) {
        // Handle validation errors
        return response()->json([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $e->errors(),
        ], 422);

    } catch (\Exception $e) {
        // Handle general exceptions
        Log::error('Error creating contact: ' . $e->getMessage());

        return response()->json([
            'success' => false,
            'message' => 'Failed to create contact. Please try again later.',
        ], 500);
    }
}

}
