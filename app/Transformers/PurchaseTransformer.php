<?php

namespace App\Transformers;

use App\Purchase;
use League\Fractal\TransformerAbstract;

class PurchaseTransformer extends TransformerAbstract
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
     * @param Purchase $purchase
     * @return array
     */
    public function transform(Purchase $purchase)
    {
        return $purchase->toArray();
    }
}
