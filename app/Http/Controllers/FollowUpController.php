<?php

namespace App\Http\Controllers;

use App\Customer;
use App\FollowUp;
use App\Http\Requests\FollowUpRequest;
use App\IndexResponse;
use App\Responses\Facades\ResponseFacade;
use App\Transformers\FollowUpTransformer;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FollowUpController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function index()
    {
        $this->authorize('index', FollowUp::class);

        return ResponseFacade::indexRespond(
            fractal(
                (new IndexResponse(FollowUp::query()))->execute()
                , new FollowUpTransformer()
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param FollowUpRequest $request
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function store(FollowUpRequest $request)
    {
        $this->authorize('store', FollowUp::class);

        $data = $request->validated();

        $followUp = FollowUp::create($data);

        Customer::find($data['customer_id'])->followUps()->save($followUp);

        return ResponseFacade::createRespond(
            fractal(
                $followUp,
                new FollowUpTransformer()
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
        $this->authorize('show', FollowUp::class);

        return ResponseFacade::showRespond(
            fractal(
                FollowUp::find($id),
                new FollowUpTransformer()
            )
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param FollowUpRequest $request
     * @param FollowUp $followUp
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function update(FollowUpRequest $request, FollowUp $followUp)
    {
        $this->authorize('update', FollowUp::class);

        $followUp->update($request->validated());

        return ResponseFacade::updateRespond(
            fractal(
                $followUp,
                new FollowUpTransformer()
            )
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param FollowUp $followUp
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function destroy(FollowUp $followUp)
    {
        $this->authorize('destroy', FollowUp::class);

        $followUp->delete();

        return ResponseFacade::deleteRespond();
    }
}
