<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AdminRolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        $permissions = [
            'view dashboard',
            'manage admins',
            'manage roles',
            'view merchants',
            'suspend merchants',
            'approve kyb',
            'manage pools',
            'manage procurement',
            'manage fulfillment',
            'manage products',
            'manage suppliers',
            'view payments',
            'issue refunds',
            'send notifications',
            'view reports',
            'view audit logs',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission, 'guard_name' => 'admin']);
        }

        // create roles and assign created permissions

        $role = Role::create(['name' => 'Operations Manager', 'guard_name' => 'admin']);
        $role->givePermissionTo([
            'view dashboard', 'view merchants', 'suspend merchants', 'approve kyb',
            'manage pools', 'manage procurement', 'manage fulfillment',
            'manage products', 'manage suppliers', 'view payments', 'view reports'
        ]);

        $role = Role::create(['name' => 'Procurement Officer', 'guard_name' => 'admin']);
        $role->givePermissionTo([
            'view dashboard', 'manage pools', 'manage procurement', 'manage products', 'manage suppliers'
        ]);

        $role = Role::create(['name' => 'Fulfillment Officer', 'guard_name' => 'admin']);
        $role->givePermissionTo([
            'view dashboard', 'manage fulfillment'
        ]);

        $role = Role::create(['name' => 'Support Officer', 'guard_name' => 'admin']);
        $role->givePermissionTo([
            'view dashboard', 'view merchants', 'view payments'
        ]);

        $role = Role::create(['name' => 'Finance Officer', 'guard_name' => 'admin']);
        $role->givePermissionTo([
            'view dashboard', 'view payments', 'issue refunds', 'view reports'
        ]);

        $role = Role::create(['name' => 'Compliance Officer', 'guard_name' => 'admin']);
        $role->givePermissionTo([
            'view dashboard', 'view merchants', 'suspend merchants', 'approve kyb', 'view audit logs'
        ]);

        // Super Admin gets all permissions
        $role = Role::create(['name' => 'Super Admin', 'guard_name' => 'admin']);
        $role->givePermissionTo(Permission::where('guard_name', 'admin')->get());
    }
}
