<?php

namespace App\Http\Controllers\API\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\RolePermissionsResource;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AdminRolePermissionsController extends Controller
{
    // Get All Roles & Permissions
    public function index()
    {
        $roles = Role::all()->pluck('name');
        $permissions = Permission::all()->groupBy('group_name');


        return response()->json([
            'roles' => $roles,
            'permissions' => $permissions
        ]);
    }

    // Get Role With Permissions
    public function rolePermissions(Request $request)
    {
        $role = $request->query('role');

        $rolePermissions = Role::with('permissions')->whereName($role)->first();

        return response()->json(RolePermissionsResource::make($rolePermissions));
    }

    // Update Role Permissions
    public function updateRolePermissions(Request $request)
    {
        $request->validate([
            'role' => [
                'required',
                Rule::in(['user', 'editor', 'admin'])
            ],
            'permissions' => 'required|array',
            'permissions.*' => [
                'required',
                'string',
                Rule::in([
                    'user_view',
                    'user_create',
                    'user_edit',
                    'user_delete',
                    'editor_view',
                    'editor_create',
                    'editor_edit',
                    'editor_delete',
                    'product_view',
                    'product_create',
                    'product_edit',
                    'product_delete'
                ])
            ]
        ]);

        $role = Role::whereName($request->role)->first();
        $role->syncPermissions($request->permissions);

        return response()->json([
            'message' => 'Permissions Updated'
        ]);
    }
}
