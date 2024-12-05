<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('/register', [App\Http\Controllers\Api\ApiController::class, 'register']);
Route::post('/login', [App\Http\Controllers\Api\ApiController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', [App\Http\Controllers\Api\ApiController::class, 'profile']);
    Route::get('/logout', [App\Http\Controllers\Api\ApiController::class, 'logout']);
    Route::put('/update', [App\Http\Controllers\Api\ApiController::class, 'updateProfile'] );

   
    Route::get('/comments', [App\Http\Controllers\Api\CommentApiController::class, 'index']);
    Route::post('/storecomment', [App\Http\Controllers\Api\CommentApiController::class, 'storeComment']);
    Route::put('/updatecomment/{id}', [App\Http\Controllers\Api\CommentApiController::class, 'updateComment']);
    Route::delete('/deletecomment/{id}', [App\Http\Controllers\Api\CommentApiController::class, 'deleteComment']);

    
});

