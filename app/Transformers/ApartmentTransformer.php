<?php

namespace App\Transformers;

use App\Apartment;
use League\Fractal\TransformerAbstract;

class ApartmentTransformer extends TransformerAbstract
{
    /**
     * List of resources to automatically include
     *
     * @var array
     */
    protected $defaultIncludes = [
        //
    ];

    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [
        //
    ];

    /**
     * A Fractal transformer.
     *
     * @param Apartment $apartment
     * @return array
     */
    public function transform(Apartment $apartment)
    {
        return $apartment->toArray();
    }
}
