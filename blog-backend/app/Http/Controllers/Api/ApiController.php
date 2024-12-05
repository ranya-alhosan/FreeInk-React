<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


use App\Models\User; 

class ApiController extends Controller
{
    

    // Register function (POST,formData)
    public function register(Request $request){
                $request->validate([
                   'name'=>'required',
                   'email'=>'required|email|unique:users',
                   'password'=>'required|confirmed',
                ]);

                $user = User::create([
                    'name'=>$request->name,
                    'email'=>$request->email,
                    'password'=>Hash::make($request->password),
                    
                ]);

            
  
                return response()->json([
                    'status'=>true,
                    'message'=>'User registered Successfully',
                ]);

    }


    //Login function (POST,formData)
    public function login(Request $request){

    $request->validate([
        'email'=>'required|email',
        'password'=>'required',

    ]);

    $user = User::where('email',$request->email)->first();
    
    if(!empty($user)){
      if(Hash::check($request->password,$user->password)){
          $token=$user->createToken('MyToken')->plainTextToken;
          return response()->json([
              'status'=>true,
              'message'=>'Login Successfully',
              'token'=>$token,
              'name'=>$user,
              
          ]);
      }
      return response()->json([
          'status'=>false,
          'message'=>'Password or email does not match',
      ]);
    }

    return response()->json([
        'status'=>false,
        'message'=>'User not registered',
    ]);
           


    }


    //Profile function (GET)
    public function profile(){
        $data = auth()->user();

        return response()->json([
            'status'=>true,
            'data'=>$data,
        ]);
      
    }


    //Logout function (GET) 
    public function logout(){

     auth()->user()->tokens()->delete();
     return response()->json([
        'status'=>true,
        'message'=>'Logout Successfully', 
     ]);
    }


    //Update Profile function (PUT)
    public function updateProfile(Request $request ){
         $request->validate([
            'name'=>'string',
            'email'=>'email|unique:users',
            'password'=>'confirmed',
         ]);

         $user = auth()->user();

         if ($request->filled('name')) {
            $user->name = $request->input('name');
        }
        if ($request->filled('email')) {
            $user->email = $request->input('email');
        }
        if ($request->filled('password')) {
            $user->password = Hash::make($request->input('password'));
        }
        
         $user->save();
    
        // Return a success response
        return response()->json([
            'status' => true,
            'message' => 'Profile updated successfully',
             'data'=>$user,
        ]);
    }

    



    


}
