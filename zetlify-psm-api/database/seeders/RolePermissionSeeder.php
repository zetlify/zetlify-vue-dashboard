<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Permissions
        $permissions = [
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
            'product_delete',
        ];

        foreach ($permissions as $permissions) {
            Permission::create([
                'name' => $permissions,
                'group_name' => 'user_access'
            ]);
        }

        // Admin
        $admin_role = Role::create(['name' => 'admin']);
        $admin_role->givePermissionTo(Permission::all());


        // User (Customer)
        $user_role = Role::create(['name' => 'user']);
        $user_role->givePermissionTo([
            'user_view',
            'editor_view',
            'editor_create',
            'editor_edit',
            'editor_delete'
        ]);

        // Editor (Customer's Editor)
        $editor_role = Role::create(['name' => 'editor']);
        $editor_role->givePermissionTo([
            'product_view',
            'product_create',
            'product_edit',
            'product_delete',
        ]);
    }
}
