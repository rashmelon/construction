<?php

namespace App\Http\Controllers;

use App\Apartment;
use App\Customer;
use App\Http\Requests\PurchaseRequest;
use App\IndexResponse;
use App\Installment;
use App\Purchase;
use App\Responses\Facades\ResponseFacade;
use App\Transformers\ApartmentTransformer;
use App\Transformers\CustomerTransformer;
use App\Transformers\PurchaseTransformer;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function index()
    {
        $this->authorize('index', Purchase::class);

        return ResponseFacade::indexRespond(
            fractal(
                (new IndexResponse(Purchase::query()))->execute()
                , new PurchaseTransformer()
            )
        );
    }
    /**
     * Display a creation form of a new resource.
     *
     * @return JsonResponse
     */
    public function create()
    {
        return ResponseFacade::respond(
            'data fetched successfully',
            [
                'customers' => fractal((Customer::all()), new CustomerTransformer()),
                'apartments' => fractal((Apartment::all()), new ApartmentTransformer()),
            ]
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param PurchaseRequest $request
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function store(PurchaseRequest $request)
    {
        $this->authorize('store', Purchase::class);

        $data = $request->validated();

        $purchase = Purchase::create($data);

        if ($data['installments']){
            foreach ($data['installments'] as $installment){
                $installment= Installment::create($installment);
                $purchase->installments()->save($installment);
            }
        }

        Customer::find($data['customer_id'])->purchases()->save($purchase);
        $apartment = Apartment::find($data['apartment_id']);
        $apartment->update(['sold' => 1]);
        $apartment->save();
        $apartment->purchases()->save($purchase);

        return ResponseFacade::createRespond(
            fractal(
                $purchase,
                new PurchaseTransformer()
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
        $this->authorize('show', Purchase::class);

        return ResponseFacade::showRespond(
            fractal(
                Purchase::find($id),
                new PurchaseTransformer()
            )
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param PurchaseRequest $request
     * @param Purchase $purchase
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function update(PurchaseRequest $request, Purchase $purchase)
    {
        $this->authorize('update', Purchase::class);

        $purchase->update($request->validated());

        return ResponseFacade::updateRespond(
            fractal(
                $purchase,
                new PurchaseTransformer()
            )
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Purchase $purchase
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function destroy(Purchase $purchase)
    {
        $this->authorize('destroy', Purchase::class);

        $purchase->delete();

        return ResponseFacade::deleteRespond();
    }
}
