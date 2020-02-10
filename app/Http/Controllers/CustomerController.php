<?php

namespace App\Http\Controllers;

use App\Customer;
use App\Http\Requests\CustomerRequest;
use App\IndexResponse;
use App\Responses\Facades\ResponseFacade;
use App\Transformers\CustomerTransformer;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function index()
    {
        $this->authorize('index', Customer::class);

        return ResponseFacade::indexRespond(
            fractal(
                (new IndexResponse(Customer::query()))->execute()
                , new CustomerTransformer()
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param CustomerRequest $request
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function store(CustomerRequest $request)
    {
        $this->authorize('store', Customer::class);

        $data = $request->validated();

        return ResponseFacade::createRespond(
            fractal(
                Customer::create($data),
                new CustomerTransformer()
            )
        );
    }

    /**
     * Display the specified resource.
     *
     * @param $id
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function show($id)
    {
        $this->authorize('show', Customer::class);

        return ResponseFacade::showRespond(
            fractal(
                Customer::find($id),
                new CustomerTransformer()
            )
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param CustomerRequest $request
     * @param Customer $customer
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function update(CustomerRequest $request, Customer $customer)
    {
        $this->authorize('update', Customer::class);

        $customer->update($request->validated());

        return ResponseFacade::updateRespond(
            fractal(
                $customer,
                new CustomerTransformer()
            )
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Customer $customer
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function destroy(Customer $customer)
    {
        $this->authorize('destroy', Customer::class);

        $customer->delete();

        return ResponseFacade::deleteRespond();
    }
}
