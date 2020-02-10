<?php

namespace App\Transformers;

use App\Project;
use League\Fractal\TransformerAbstract;

class ProjectTransformer extends TransformerAbstract
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
     * @param Project $project
     * @return array
     */
    public function transform(Project $project)
    {
        return $project->toArray();
    }
}
