<?php

namespace App;

use App\Traits\ImageTrait;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use ImageTrait;

    protected $fillable = ['name', 'image'];

    public function apartments()
    {
        return $this->hasMany(Apartment::class);
    }
}
