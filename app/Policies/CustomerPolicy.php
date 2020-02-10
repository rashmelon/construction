<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CustomerPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function index()
    {
        return request()->user()->hasPermissionTo('browse-customer');
    }

    public function store()
    {
        return request()->user()->hasPermissionTo('create-customer');
    }

    public function show($id)
    {
        return request()->user()->hasPermissionTo('view-customer');
    }

    public function update()
    {
        return request()->user()->hasPermissionTo('edit-customer');
    }

    public function destroy()
    {
        return request()->user()->hasPermissionTo('delete-customer');
    }
}
