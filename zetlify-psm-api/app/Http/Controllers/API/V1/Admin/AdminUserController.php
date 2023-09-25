<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminUserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class AdminUserController extends Controller
{
    // Get All Users
    public function index(Request $request, User $user)
    {
        Gate::authorize('view', $user);

        // Sorting & Filtering
        $sortBy = $request->query('sort');
        $direction = $request->query('direction');

        $dateStart = $request->query('dateStart');
        $dateEnd = $request->query('dateEnd');

        $users = User::role(['user', 'editor'])->paginate(5);

        if($dateStart && $dateEnd) {
            $users = User::role(['user', 'editor'])
            ->whereBetween('created_at', [$dateStart, $dateEnd])
            ->paginate(5);
        }

        // Check if has search query
        if ($request->query('search')) {
            $users = User::role(['user', 'editor'])
                ->where('name', 'LIKE', '%' . $request->query('search') . '%')
                ->orWhere('email', 'LIKE', '%' . $request->query('search') . '%')
                ->paginate(5);
        }

        // Set Collection Sorted
        $sortedUsers = $users->setCollection(
            $users->sortBy([[$sortBy, $direction]])
        );

        return response()->json(AdminUserResource::collection($sortedUsers)->response()->getData());
    }

    // Get All Users Id
    public function getIds(User $user)
    {
        Gate::authorize('view', $user);

        $ids = User::role(['user', 'editor'])->pluck('id')->toArray();
        return response()->json($ids);
    }

    // Create User
    public function store(Request $request)
    {
        Gate::authorize('create');

        $registerSchema = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
            'role' => [
                'required',
                Rule::in(['user', 'editor', 'admin'])
            ]
        ]);

        $user = User::create($registerSchema);
        $user->assignRole($request->input('role'));

        $role = $request->role;
        $message = '';
        switch ($role) {
            case 'user':
                $message = 'User created successfully';
                break;
            case 'editor':
                $message = 'Editor created successfully';
                break;
            case 'admin':
                $message = 'Admin created successfully';
                break;
        }

        return response()->json([
            'message' => $message
        ]);
    }

    // Edit User
    public function edit($id, User $user)
    {
        Gate::authorize('edit', $user);

        $user = User::find($id);

        return response()->json($user);
    }

    // Update User
    public function update(Request $request, $id, User $user)
    {
        Gate::authorize('edit', $user);

        $updateSchema = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
            'role' => [
                'required',
                Rule::in(['user', 'editor', 'admin'])
            ]
        ]);

        $user = User::create($updateSchema);
        $user->assignRole($request->input('role'));

        $role = $request->role;
        $message = '';
        switch ($role) {
            case 'user':
                $message = 'User updated successfully';
                break;
            case 'editor':
                $message = 'Editor updated successfully';
                break;
            case 'admin':
                $message = 'Admin updated successfully';
                break;
        }

        return response()->json([
            'message' => $message
        ]);
    }

    // Delete User
    public function destroy($id, User $user)
    {

        Gate::authorize('delete', $user);

        User::destroy($id);

        return response()->json([
            'message' => 'User deleted'
        ]);
    }

    // Delete Multiple Users
    public function deleteMultiple($ids, User $user)
    {
        Gate::authorize('delete', $user);

        User::destroy($ids);

        return response()->json([
            'message' => 'Selected users deleted'
        ]);
    }
}
