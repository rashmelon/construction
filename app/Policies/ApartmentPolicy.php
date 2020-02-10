<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ApartmentPolicy
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
        return request()->user()->hasPermissionTo('browse-apartment');
    }

    public function store()
    {
        return request()->user()->hasPermissionTo('create-apartment');
    }

    public function show($id)
    {
        return request()->user()->hasPermissionTo('view-apartment');
    }

    public function update()
    {
        return request()->user()->hasPermissionTo('edit-apartment');
    }

    public function destroy()
    {
        return request()->user()->hasPermissionTo('delete-apartment');
    }
}
