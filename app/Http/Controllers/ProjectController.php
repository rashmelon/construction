<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\IndexResponse;
use App\Project;
use App\Responses\Facades\ResponseFacade;
use App\Transformers\ProjectTransformer;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function index()
    {
        $this->authorize('index', Project::class);

        return ResponseFacade::indexRespond(
            fractal(
                (new IndexResponse(Project::query()))->execute()
                , new ProjectTransformer()
            )
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ProjectRequest $request
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function store(ProjectRequest $request)
    {
        $this->authorize('store', Project::class);

        $data = $request->validated();

        if (\request()->hasFile('image')) {
            $data['image'] = download_file(\request()->file('image'), config('paths.image.create'));
        }

        $project = Project::create($data);

        return ResponseFacade::createRespond(
            fractal(
                $project,
                new ProjectTransformer()
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
        $this->authorize('show', Project::class);

        return ResponseFacade::showRespond(
            fractal(
                Project::find($id),
                new ProjectTransformer()
            )
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ProjectRequest $request
     * @param int $id
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function update(ProjectRequest $request, $id)
    {
        $this->authorize('update', Project::class);

        $project = Project::find($id);

        $project->update($request->validated());

        return ResponseFacade::updateRespond(
            fractal(
                Project::find($id),
                new ProjectTransformer()
            )
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return JsonResponse
     * @throws AuthorizationException
     */
    public function destroy($id)
    {
        $this->authorize('destroy', Project::class);

        $project = Project::find($id);

        Storage::disk('public')->delete(config('paths.image.delete').$project->image);

        $project->delete();

        return ResponseFacade::deleteRespond();
    }
}
