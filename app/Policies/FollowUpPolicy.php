<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class FollowUpPolicy
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
        return request()->user()->hasPermissionTo('browse-follow-up');
    }

    public function store()
    {
        return request()->user()->hasPermissionTo('create-follow-up');
    }

    public function show($id)
    {
        return request()->user()->hasPermissionTo('view-follow-up');
    }

    public function update()
    {
        return request()->user()->hasPermissionTo('edit-follow-up');
    }

    public function destroy()
    {
        return request()->user()->hasPermissionTo('delete-follow-up');
    }
}
