<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = ['email', 'name', 'phone', 'birth_date', 'reference', 'landing'];

    public function followUps()
    {
        return $this->hasMany(FollowUp::class);
    }

    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }

    public function scopeLanding($query)
    {
        return $query->where('landing', 1);
    }

    public function scopeNotLanding($query)
    {
        return $query->where('landing', 0);
    }

    public function scopeSearch($query, $search)
    {
        $query
            ->orWhere('name', 'like', "%$search%")
            ->orWhere('email', 'like', "%$search%")
            ->orWhere('phone', 'like', "%$search%")
            ->orderBy('name');
    }
}
