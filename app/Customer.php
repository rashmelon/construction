<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = ['name', 'phone', 'birth_date', 'reference'];

    public function followUps()
    {
        return $this->hasMany(FollowUp::class);
    }

    public function purchases()
    {
        return $this->hasMany(Purchase::class);
    }
}
