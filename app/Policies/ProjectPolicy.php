<?php

namespace App\Policies;

use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProjectPolicy
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
        return request()->user()->hasPermissionTo('browse-project');
    }

    public function store()
    {
        return request()->user()->hasPermissionTo('create-project');
    }

    public function show($id)
    {
        return request()->user()->hasPermissionTo('view-project');
    }

    public function update()
    {
        return request()->user()->hasPermissionTo('edit-project');
    }

    public function destroy()
    {
        return request()->user()->hasPermissionTo('delete-project');
    }
}
