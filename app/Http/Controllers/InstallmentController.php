<?php

namespace App\Http\Controllers;

use App\IndexResponse;
use App\Installment;
use App\Responses\Facades\ResponseFacade;
use App\Transformers\InstallmentTransformer;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InstallmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        return ResponseFacade::indexRespond(
            fractal(
                (new IndexResponse(Installment::with('purchase.customer')))->execute()
                , new InstallmentTransformer()
            )
        );
    }
}
