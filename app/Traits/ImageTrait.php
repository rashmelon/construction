<?php

namespace App\Traits;

trait ImageTrait{
    public function getImageAttribute($value)
    {
        if ($value)
            return config('paths.image.get').$value;
        return '';
    }
}
