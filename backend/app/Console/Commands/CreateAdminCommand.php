<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Admin;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use function Laravel\Prompts\text;
use function Laravel\Prompts\password;
use function Laravel\Prompts\select;

class CreateAdminCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'quantigo:create-admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new admin user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Creating a new Quantigo Admin');

        $name = text(
            label: 'What is the admin\'s full name?',
            required: true,
            validate: fn (string $value) => match (true) {
                strlen($value) < 3 => 'The name must be at least 3 characters.',
                default => null
            }
        );

        $email = text(
            label: 'What is the admin\'s email address?',
            required: true,
            validate: fn (string $value) => match (true) {
                !filter_var($value, FILTER_VALIDATE_EMAIL) => 'The email address must be valid.',
                Admin::where('email', $value)->exists() => 'An admin with this email already exists.',
                default => null
            }
        );

        $passwordValue = password(
            label: 'What is the admin\'s password?',
            required: true,
            validate: fn (string $value) => match (true) {
                strlen($value) < 8 => 'The password must be at least 8 characters.',
                default => null
            }
        );

        $roles = Role::where('guard_name', 'admin')->pluck('name')->toArray();
        if (empty($roles)) {
            $this->error('No admin roles found. Please run the seeder first: php artisan db:seed --class=AdminRolesAndPermissionsSeeder');
            return Command::FAILURE;
        }

        $roleName = select(
            label: 'Select a role for the admin',
            options: $roles,
            default: 'Operations Manager'
        );

        $admin = Admin::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($passwordValue),
            'email_verified_at' => now(),
        ]);

        $admin->assignRole($roleName);

        $this->info("Admin '{$name}' created successfully with role '{$roleName}'!");

        return Command::SUCCESS;
    }
}
