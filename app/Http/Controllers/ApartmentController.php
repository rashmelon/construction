<?php

namespace App\Http\Controllers;

use App\Apartment;
use App\Http\Requests\ApartmentRequest;
use App\IndexResponse;
use App\Project;
use App\Responses\Facades\ResponseFacade;
use App\Transformers\ApartmentTransformer;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ApartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function index()
    {
        $this->authorize('index', Apartment::class);

        return ResponseFacade::indexRespond(
            fractal(
                (new IndexResponse(Apartment::query()))->execute()
                , new ApartmentTransformer()
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ApartmentRequest $request
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function store(ApartmentRequest $request)
    {
        $this->authorize('store', Apartment::class);

        $data = $request->validated();

        if (\request()->hasFile('image')) {
            $data['image'] = download_file(\request()->file('image'), config('paths.image.create'));
        }

        $apartment = Apartment::create($data);

        Project::find($data['project_id'])->apartments()->save($apartment);

        return ResponseFacade::createRespond(
            fractal(
                Apartment::find($apartment->id),
                new ApartmentTransformer()
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
        $this->authorize('show', Apartment::class);

        return ResponseFacade::showRespond(
            fractal(
                Apartment::find($id),
                new ApartmentTransformer()
            )
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ApartmentRequest $request
     * @param Apartment $apartment
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function update(ApartmentRequest $request, Apartment $apartment)
    {
        $this->authorize('update', Apartment::class);

        $apartment->update($request->validated());

        return ResponseFacade::updateRespond(
            fractal(
                $apartment,
                new ApartmentTransformer()
            )
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Apartment $apartment
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function destroy(Apartment $apartment)
    {
        $this->authorize('destroy', Apartment::class);

        Storage::disk('public')->delete(config('paths.image.delete').$apartment->image);

        $apartment->delete();

        return ResponseFacade::deleteRespond();
    }
}
