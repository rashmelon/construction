<?php

namespace App\Transformers;

use App\FollowUp;
use League\Fractal\TransformerAbstract;

class FollowUpTransformer extends TransformerAbstract
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
     * @param FollowUp $followUp
     * @return array
     */
    public function transform(FollowUp $followUp)
    {
        return $followUp->toArray();
    }
}
