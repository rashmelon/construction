<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PurchasePolicy
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
        return request()->user()->hasPermissionTo('browse-purchase');
    }

    public function store()
    {
        return request()->user()->hasPermissionTo('create-purchase');
    }

    public function show($id)
    {
        return request()->user()->hasPermissionTo('view-purchase');
    }

    public function update()
    {
        return request()->user()->hasPermissionTo('edit-purchase');
    }

    public function destroy()
    {
        return request()->user()->hasPermissionTo('delete-purchase');
    }
}
