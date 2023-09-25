<?php

namespace App\Http\Controllers\API\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Get Auth User
    public function index(Request $request)
    {
        return UserResource::Make($request->user());
    }
}
