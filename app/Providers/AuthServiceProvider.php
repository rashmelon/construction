<?php

namespace App\Providers;

use App\Apartment;
use App\Customer;
use App\FollowUp;
use App\Policies\ApartmentPolicy;
use App\Policies\CustomerPolicy;
use App\Policies\FollowUpPolicy;
use App\Policies\ProjectPolicy;
use App\Policies\PurchasePolicy;
use App\Policies\UserPolicy;
use App\Policies\PermissionPolicy;
use App\Policies\RolePolicy;
use App\Project;
use App\Purchase;
use App\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
        User::class => UserPolicy::class,
        Role::class => RolePolicy::class,
        Permission::class => PermissionPolicy::class,
        Project::class => ProjectPolicy::class,
        Apartment::class => ApartmentPolicy::class,
        Customer::class => CustomerPolicy::class,
        FollowUp::class => FollowUpPolicy::class,
        Purchase::class => PurchasePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();
    }
}
