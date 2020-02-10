<?php

namespace App;

use App\Traits\ImageTrait;
use Illuminate\Database\Eloquent\Model;

class Apartment extends Model
{
    use ImageTrait;

    protected $fillable = ['number', 'floor', 'area', 'image', 'sold'];

    protected $with = ['project'];

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }

    public function scopeProject($query, $id)
    {
        return $query->where('project_id', $id);
    }

    public function scopeSold($query)
    {
        return $query->where('sold', 1);
    }

    public function scopeNotSold($query)
    {
        return $query->where('sold', 0);
    }
}
