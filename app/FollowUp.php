<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class FollowUp extends Model
{
    protected $fillable = ['date', 'time', 'status', 'notes', 'call_status', 'important'];

    protected $with = ['customer'];

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function scopeCustomer($query, $id)
    {
        return $query->where('customer_id', $id);
    }

    public function scopeToday($query)
    {
        return $query->where('date', today());
    }

    public function scopeImportant($query)
    {
        return $query->where('important', 1);
    }

    public function scopeStatus($query, $status)
    {
        return $query->where('status', $status);
    }
}
