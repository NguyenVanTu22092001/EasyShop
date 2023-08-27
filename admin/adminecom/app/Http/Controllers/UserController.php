<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function User()
    {
        return Auth::user();
        // try {
        //     $user =  Auth::user();

        //     return response([
        //         'message' => "Successfull",
        //         'token' => $token,
        //         'user' => $user,
        //     ], 200);
        // } catch (Exception $exception) {
        //     return response([
        //         'message' => $exception->getMessage(),
        //     ], 400);
        // }
    }
    // public function index()
    // {

    //     $users = User::orderBy('id', 'desc')->paginate(10);

    //     return $users;
    // }
}
