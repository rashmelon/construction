<?php

namespace App\Http\Controllers\web;

use App\Customer;
use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerRequest;
use Illuminate\Contracts\View\Factory;
use Illuminate\View\View;

class CustomerController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param CustomerRequest $request
     * @return Factory|View
     */
    public function store(CustomerRequest $request)
    {
        $data = $request->validated();
        $data['landing'] = 1;

        Customer::create($data);

        return view('pages.thanks');
    }
}
