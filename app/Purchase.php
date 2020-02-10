<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    protected $fillable = ['end_date', 'finished'];

    protected $with = ['customer', 'apartment', 'installments'];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
    public function apartment()
    {
        return $this->belongsTo(Apartment::class);
    }

    public function installments()
    {
        return $this->hasMany(Installment::class);
    }

    public function scopeCustomer($query, $id)
    {
        $query->where('customer_id', $id);
    }

    public function scopeApartment($query, $id)
    {
        $query->where('apartment_id', $id);
    }
}
