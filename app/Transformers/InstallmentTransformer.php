<?php

namespace App\Transformers;

use App\Installment;
use League\Fractal\TransformerAbstract;

class InstallmentTransformer extends TransformerAbstract
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
     * @param Installment $installment
     * @return array
     */
    public function transform(Installment $installment)
    {
        return $installment->toArray();
    }
}
