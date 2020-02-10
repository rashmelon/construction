<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Installment extends Model
{
    protected $fillable = ['date', 'amount', 'paid_at', ];

    public function purchase()
    {
        return $this->belongsTo(Purchase::class, 'purchase_id');
    }

    public function scopePurchase($query, $id)
    {
        return $query->where('purchase_id', $id);
    }

    public function scopeToday($query)
    {
        return $query->where('date', today());
    }
}
